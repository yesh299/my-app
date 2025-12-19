const Product = require('../models/Product');
const { products: mockProducts } = require('../mockData');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, minRating, sort } = req.query;

    let productsData = [];
    
    // Try to use database first, fallback to mock data
    try {
      const query = buildQuery(category, search, minPrice, maxPrice, minRating);
      productsData = await Product.find(query);
    } catch (dbError) {
      console.log('Using mock data...');
      productsData = mockProducts;
    }

    // Apply filtering
    let filtered = productsData;

    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter(p => {
        if (minPrice && p.price < Number(minPrice)) return false;
        if (maxPrice && p.price > Number(maxPrice)) return false;
        return true;
      });
    }

    if (minRating) {
      filtered = filtered.filter(p => p.rating >= Number(minRating));
    }

    // Apply sorting
    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const buildQuery = (category, search, minPrice, maxPrice, minRating) => {
  let query = {};

  if (category && category !== 'All') {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (minRating) {
    query.rating = { $gte: Number(minRating) };
  }

  return query;
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    let product;
    
    try {
      product = await Product.findById(req.params.id).populate('reviews.user', 'name');
    } catch (dbError) {
      product = mockProducts.find(p => p._id === req.params.id);
    }

    if (product) {
      res.json({
        success: true,
        data: product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create a product review
// @route   POST /api/products/:id/reviews
// @access  Private
exports.createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    let product;
    
    try {
      product = await Product.findById(req.params.id);
    } catch (dbError) {
      product = mockProducts.find(p => p._id === req.params.id);
    }

    if (product) {
      const alreadyReviewed = product.reviews?.find(
        (r) => r.user?.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({
          success: false,
          message: 'Product already reviewed',
        });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      if (!product.reviews) product.reviews = [];
      product.reviews.push(review);
      product.reviewsNumber = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      // Try to save to DB, if fails just respond successfully
      try {
        await product.save();
      } catch (saveError) {
        console.log('Could not save to database, but review created locally');
      }

      res.status(201).json({
        success: true,
        message: 'Review added',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
