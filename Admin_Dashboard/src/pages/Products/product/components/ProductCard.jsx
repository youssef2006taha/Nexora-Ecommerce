import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, CheckCircle2 } from "lucide-react";
import MainCard from "../../../../components/UI/MainCard"

function CreateProductPage() {
  return (
    <div className="p-6 pb-0 max-w-7xl mx-2 space-y-4">
      
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-text-primary bg-bg-card border border-border rounded-full hover:bg-bg-hover transition-colors w-fit"
      >
        <ArrowLeft size={14} />
        Back to products
      </Link>

      <MainCard
        badge="CREATE PRODUCT"
        title={
          <div className="flex items-center gap-4 mt-2">
            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <Package size={22} strokeWidth={2} />
            </div>
            <span>Launch a polished product entry</span>
          </div>
        }
        description="Add products with validation, image previews, multi-upload support, and smooth UX."
      >
        
        <div className="bg-bg-card/40 backdrop-blur-xs border border-border p-4 rounded-xl max-w-[260px] space-y-1.5 transition-all hover:border-primary/30 md:mt-6">
          <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-[10px] uppercase">
            <CheckCircle2 size={12} />
            Ready
          </div>
          <p className="text-[12px] text-text-muted leading-relaxed font-medium">
            Create, validate, and save with one click.
          </p>
        </div>

      </MainCard>

    </div>
  );
}

export default CreateProductPage;