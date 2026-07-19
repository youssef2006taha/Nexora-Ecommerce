import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Eye,
  Tag,
  Star,
  Layers,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import DashboardLoader from "../../../components/UI/DashboardLoader";

function ViewProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        const productData =
          response.product ||
          response.data?.product ||
          response.data ||
          response;

        setProduct(productData);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <DashboardLoader />;
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-error font-semibold text-sm bg-bg-main">
        Product not found.
      </div>
    );
  }

  const images =
    product.images?.map((img) =>
      typeof img === "object" ? img.url : img
    ) || [];

  if (images.length === 0 && product.image) {
    images.push(product.image);
  }

  return (

    
    <div className="max-w-7xl mx-auto p-6 space-y-6 min-h-screen">
      {/* header */}
      <div 
        className="bg-bg-card rounded-[var(--radius-xl-value)] p-8 text-text-primary relative overflow-hidden border border-border transition-all duration-300"
        style={{ boxShadow: "var(--shadow-xs-value)" }}
      >
        <button
          onClick={() => navigate("/products")}
          className="inline-flex items-center gap-2 bg-bg-hover/40 hover:bg-bg-hover text-text-muted hover:text-text-primary text-[12px] font-medium px-4 py-2 rounded-[var(--radius-md-value)] transition-all duration-150 mb-6 border border-border cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to products</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[var(--radius-md-value)] bg-primary-light border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-[var(--shadow-primary-value)]">
            <Eye className="w-5 h-5" />
          </div>

          <div>
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
              View Product
            </span>
            
            <h1 className="text-[26px] font-bold tracking-tight text-text-primary mt-0.5 leading-tight">
              {product.name || product.title}
            </h1>
            
            <p className="text-text-muted text-[13px] mt-1.5 leading-relaxed">
              Product details overview and asset media.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-bg-card rounded-[var(--radius-xl-value)] border border-[var(--border)] p-4 overflow-hidden"
            style={{ boxShadow: "var(--shadow-sm-value)" }}
          >
            <img 
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-[450px] object-contain rounded-xl"
            />
          </div>
          
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, index) => (
                <button 
                  key={index}  
                  onClick={() => setSelectedImage(index)}
                  className={`w-24 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all duration-300 cursor-pointer
                    ${selectedImage === index ? "border-primary scale-105 shadow-md" : "border-[var(--border)] hover:border-primary/50"}`}
                >
                  <img 
                    src={img}  
                    alt={`thumbnail-${index}`}
                    className="w-full h-full object-cover" 
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="bg-bg-card rounded-[var(--radius-xl-value)] p-6 border border-[var(--border)]"
            style={{ boxShadow: "var(--shadow-sm-value)" }}
          >
            <span className="text-primary uppercase text-[11px] font-bold tracking-wider">
              Overview
            </span>

            <h2 className="text-[28px] font-bold text-text-primary tracking-tight mt-2 leading-tight">
              {product.name || product.title}
            </h2>

            <p className="text-text-muted mt-2 text-[14px] leading-relaxed font-medium">
              {product.shortDescription || product.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bg-card rounded-[var(--radius-xl-value)] p-5 border border-[var(--border)]"
              style={{ boxShadow: "var(--shadow-sm-value)" }}
            >
              <p className="text-text-muted text-[11px] font-bold tracking-wider uppercase">Price</p>
              <h3 className="text-[24px] font-black text-text-primary tracking-tight mt-1.5">${product.price}</h3>
            </div>

            <div className="bg-bg-card rounded-[var(--radius-xl-value)] p-5 border border-[var(--border)]"
              style={{ boxShadow: "var(--shadow-sm-value)" }}
            >
              <p className="text-text-muted text-[11px] font-bold tracking-wider uppercase">Discount</p>
              <h3 className="text-[24px] font-black text-text-primary tracking-tight mt-1.5">${product.discountPrice || product.discount || 0}</h3>
            </div>

            <div className="bg-bg-card rounded-[var(--radius-xl-value)] p-5 border border-[var(--border)]"
              style={{ boxShadow: "var(--shadow-sm-value)" }}
            >
              <p className="text-text-muted text-[11px] font-bold tracking-wider uppercase">Stock</p>
              <h3 className="text-[24px] font-black text-text-primary tracking-tight mt-1.5">{product.stock || 0}</h3>
            </div>

            <div className="bg-bg-card rounded-[var(--radius-xl-value)] p-5 border border-[var(--border)]"
              style={{ boxShadow: "var(--shadow-sm-value)" }}
            >
              <p className="text-text-muted text-[11px] font-bold tracking-wider uppercase">SKU</p>
              <h3 className="text-[16px] font-bold text-text-secondary tracking-tight mt-2.5 truncate">
                {product.sku || "N/A"}
              </h3>
            </div>
          </div>

          <div className="bg-bg-card rounded-[var(--radius-xl-value)] p-6 border border-[var(--border)]"
            style={{ boxShadow: "var(--shadow-sm-value)" }}
          >
            <div className="flex items-center gap-2 mb-4 text-text-primary">
              <Tag className="w-4 h-4 text-text-muted" />
              <h3 className="text-[14px] font-bold tracking-tight">Tags</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {product.tags?.length ? (
                product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-bg-hover text-primary text-[12px] font-semibold px-4 py-1.5 rounded-full border border-[var(--border)]"
                  >
                    #{tag.replace("#", "")}
                  </span>
                ))
              ) : (
                <>
                  <span className="bg-bg-hover text-primary text-[12px] font-semibold px-4 py-1.5 rounded-full border border-[var(--border)]">#phones</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-bg-hover/30 rounded-[var(--radius-xl-value)] p-6 border border-[var(--border)]">
            <div className="flex items-center gap-2 mb-3 text-text-primary">
              <Layers className="w-4 h-4 text-text-muted" />
              <h3 className="text-[14px] font-bold tracking-tight">Category Info</h3>
            </div>
            <p className="text-[13px] text-text-secondary font-semibold flex items-center gap-1.5 lowercase">
              <span>{product.category || "electronics"}</span>
              <span className="text-text-muted text-[10px]">•</span>
              <span>{product.subcategory || "audio"}</span>
              <span className="text-text-muted text-[10px]">•</span>
              <span>{product.brand || "samsung"}</span>
            </p>
          </div>

          <div className="w-full bg-warning-bg rounded-[var(--radius-xl-value)] p-6 border border-warning/10 overflow-hidden">
            <div className="flex items-center gap-2 mb-3 text-text-primary">
              <Star className="w-4 h-4 text-warning" />
              <h3 className="text-[14px] font-bold tracking-tight text-warning-text">Highlights</h3>
            </div>
            
            <p className="text-[13px] text-warning-text leading-relaxed font-medium whitespace-pre-line break-words w-full">
              {product.description || product.shortDescription || "No specific highlights available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;