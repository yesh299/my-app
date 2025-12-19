# Product Display CSS Reference Guide

## ProductCardComponent.css - Complete Overview

### Card Container
```css
.product-card {
  border: 1px solid #e6eaf0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fff;
  height: 100%;
}

.product-card:hover {
  box-shadow: 0 16px 40px rgba(29, 92, 192, 0.22);
  transform: translateY(-4px);
  border-color: #2563eb;
}
```

### Image Container
```css
.product-image-container {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f5f5 0%, #efefef 100%);
  aspect-ratio: 1 / 0.9;
}

.product-image {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.product-card:hover .product-image {
  transform: scale(1.08) rotate(0.5deg);
}
```

### Stock Badges
```css
.stock-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 5;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.stock-badge.low-stock {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.stock-badge.out-of-stock {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.featured-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}
```

### Typography
```css
.product-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.4rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-description {
  font-size: 0.88rem;
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 0.6rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.3px;
}
```

### Rating Display
```css
.product-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #fff;
  border-radius: 6px;
  padding: 4px 8px;
  font-weight: 700;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
}

.review-count {
  font-size: 0.84rem;
  color: #9ca3af;
  margin-left: 0.5rem;
  font-weight: 500;
}
```

### Pricing
```css
.product-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.5px;
}

.product-mrp {
  color: #9ca3af;
  text-decoration: line-through;
  margin-left: 10px;
  font-size: 0.95rem;
  text-decoration-thickness: 2px;
}

.product-offer {
  color: #dc2626;
  font-weight: 800;
  margin-left: 10px;
  font-size: 0.9rem;
  padding: 2px 6px;
  background: rgba(220, 38, 38, 0.1);
  border-radius: 4px;
}
```

### Button
```css
.view-details-btn {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border: none;
  color: #1f1f1f;
  font-weight: 800;
  padding: 0.5rem 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.87rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  white-space: nowrap;
}

.view-details-btn:hover {
  background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
  color: #1f1f1f;
  transform: translateX(3px) translateY(-1px);
  box-shadow: 0 6px 16px rgba(245, 158, 11, 0.4);
}

.view-details-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
}

.view-details-btn i {
  margin-right: 0.4rem;
  font-size: 0.9rem;
}
```

---

## ProductDetailsPage.css - Image Gallery

### Gallery Container
```css
.product-image-gallery {
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%);
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  aspect-ratio: 4 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-detail-image {
  border-radius: 8px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-detail-image:hover {
  transform: scale(1.05) rotate(0.3deg);
}
```

### Product Info
```css
.product-detail-title {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.product-brand {
  font-size: 1.05rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.product-detail-price {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
}
```

---

## Responsive Design Breakpoints

### Desktop (≥768px)
- Full featured display
- Side-by-side layout
- All elements visible
- Maximum font sizes

### Tablet (576px-768px)
- Adjusted sizes
- Maintained functionality
- `font-size: 0.95rem` for titles
- `font-size: 0.82rem` for descriptions

### Mobile (<576px)
- Compact design
- Optimized spacing
- `font-size: 0.9rem` for titles
- `font-size: 0.78rem` for descriptions
- Full-width buttons

---

## Color System

| Name | Hex | Usage |
|------|-----|-------|
| Dark Text | #111827 | Primary text |
| Secondary Text | #6b7280 | Descriptions |
| Tertiary Text | #9ca3af | Meta info |
| Blue Accent | #2563eb | Rating badge |
| Dark Blue | #1d4ed8 | Badge hover |
| Gold Start | #fbbf24 | Button gradient start |
| Orange | #f59e0b | Button/prices |
| Red | #dc2626 | Discount/out-of-stock |
| Green | #10b981 | In stock |
| Border | #e6eaf0 | Card borders |

---

## Animation Timing Functions

```css
/* Main easing function */
cubic-bezier(0.4, 0, 0.2, 1)

/* Duration: Image zoom */
0.4s

/* Duration: Hover effects */
0.3s

/* Duration: Button interaction */
0.3s
```

---

## Key Features Implemented

✓ Modern card design with 12px radius
✓ Enhanced shadows with proper depth
✓ Smooth animations with cubic-bezier
✓ Stock status badges with color coding
✓ Popular product indicators
✓ Professional typography hierarchy
✓ Image zoom effect (1.08x)
✓ Gradient buttons and badges
✓ Responsive design at all breakpoints
✓ Touch-friendly mobile interface

---

**Last Updated**: 2024
**CSS File Size**: +690B
**Compatibility**: All modern browsers
