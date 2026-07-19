// import React, { useEffect, useState } from "react";
// import { ArrowLeft, ImagePlus, Sparkles, Plus, X } from "lucide-react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../../api/axios";

// function EditProduct() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [loading, setLoading] = useState(true);
//   const [productImages, setProductImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [tagInput, setTagInput] = useState("");
//   const [tags, setTags] = useState([]);

//   const [formData, setFormData] = useState({
//     name: "",
//     shortDescription: "",
//     description: "",
//     price: "",
//     discountPrice: "",
//     stock: "",
//     sku: "",
//     category: "",
//     subcategory: "",
//     brand: "",
//     featured: false,
//   });

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await api.get(`/products/${id}`);
//         const product =
//           response.product ||
//           response.data?.product ||
//           response.data ||
//           response;

//         setFormData({
//           name: product.name || "",
//           shortDescription: product.shortDescription || "",
//           description: product.description || "",
//           price: product.price || "",
//           discountPrice: product.discountPrice || product.discount || "",
//           stock: product.stock || "",
//           sku: product.sku || "",
//           category: product.category || "",
//           subcategory: product.subcategory || "",
//           brand: product.brand || "",
//           featured: product.featured || false,         
//         });

//         if (product.images) {
//           setProductImages(Array.isArray(product.images) ? product.images : [product.images]);
//         }
//         if (product.tags) {
//           setTags(product.tags);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleAddTag = () => {
//     if (tagInput.trim() && !tags.includes(tagInput.trim())) {
//       setTags([...tags, tagInput.trim()]);
//       setTagInput("");
//     }
//   };

//   const handleRemoveTag = (indexToRemove) => {
//     setTags(tags.filter((_, index) => index !== indexToRemove));
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewImages((prev) => [...prev, ...files]);

//     const imagePreviews = files.map((file) =>
//       URL.createObjectURL(file)
//     );
//     setProductImages((prev) => [...prev, ...imagePreviews]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         tags,
//       };
//       await api.patch(`/products/update/${id}`, payload);
//       alert("Product updated successfully");
//       navigate("/products");
//     } catch (err) {
//       alert(JSON.stringify(err.response?.data, null, 2));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-slate-500 dark:text-slate-400 font-medium text-sm bg-slate-50 dark:bg-[#0f172a]">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6 space-y-6 bg-[#f8fafc]/40 dark:bg-[#0f172a] min-h-screen">
//       <div className="bg-[#0b1329] dark:bg-[#090d16] rounded-[24px] p-8 text-white shadow-xs relative overflow-hidden border border-transparent dark:border-slate-800">
//         <button onClick={() => navigate("/products")}
//           className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 text-[12px] font-medium px-4 py-2 rounded-xl transition-colors mb-6 border border-white/5 cursor-pointer">
//           <ArrowLeft className="w-3.5 h-3.5" />
//           <span>Back to products</span>
//         </button>

//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//           <div className="flex items-start gap-4">
//             <div className="w-12 h-12 rounded-[16px] bg-[#1a233d] flex items-center justify-center text-slate-300 shrink-0 border border-slate-800"> 
//               <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" />
//               </svg>
//             </div>
//             <div>
//               <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">Edit Product</span>
//               <h1 className="text-[26px] font-bold tracking-tight text-white mt-0.5 leading-tight">
//                 Update and refine the product entry
//               </h1>
//               <p className="text-slate-400 text-[13px] mt-1.5 leading-relaxed">
//                 Review the current product data, add new images, remove existing ones, and save your updates safely.
//               </p>
//             </div>
//           </div>

//           <div className="bg-[#121b36] border border-slate-800/60 rounded-2xl p-4 min-w-[240px] shrink-0">
//             <div className="flex items-center gap-2">
//               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//               <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Live</span>
//             </div>
//             <p className="text-[12px] text-slate-300 font-medium mt-1">Connected to the real product update API.</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
 
//         <div className="lg:col-span-5 space-y-6">
//           <div className="bg-white dark:bg-[#1e293b] rounded-[24px] border border-slate-100 dark:border-slate-800 p-6 shadow-2xs space-y-5">
//             <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
//               <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/40 flex items-center justify-center text-purple-500">
//                 <ImagePlus className="w-4 h-4" />
//               </div>
//               <div>
//                 <h3 className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">Product Gallery</h3>
//                 <p className="text-slate-400 dark:text-slate-400 text-[11px] font-medium mt-0.5">Keep existing images, add new ones, or remove selected assets before saving.</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               {productImages.length > 0 ? (
//                 productImages.map((image, index) => (
//                   <div
//                     key={index}
//                     className="border border-slate-100 dark:border-slate-800 rounded-xl p-2 bg-[#f8fafc]/60 dark:bg-[#151f32]"
//                   >
//         <img
//           src={image?.url || image}
//           alt={`Product ${index}`}
//           className="w-full h-40 object-contain rounded-lg"
//         />

//         <p className="text-center text-[10px] text-slate-400 mt-2">
//           Image {index + 1}
//         </p>
//       </div>
//     ))
//   ) : (
//     <div className="col-span-2 text-center text-slate-400 py-10">
//       No images available
//     </div>
//   )}
// </div>

//            <label className="border-2 border-dashed border-purple-200/80 dark:border-purple-800 hover:border-purple-400 rounded-2xl p-6 text-center bg-[#faf9ff] dark:bg-[#1a2235] transition-colors cursor-pointer group block">

//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageChange}
//             />

//             <div className="w-8 h-8 rounded-lg bg-white dark:bg-[#1e293b] shadow-xs flex items-center justify-center text-purple-500 mx-auto mb-2.5">
//               <ImagePlus className="w-4 h-4" />
//             </div>

//             <p className="text-[13px] font-bold text-slate-800 dark:text-slate-200">
//               Add more images
//             </p>

//             <p className="text-[11px] text-slate-400 dark:text-slate-400 font-medium mt-0.5">
//               PNG, JPG, WEBP • multiple files supported
//             </p>

//           </label>
//           </div>

//           <div className="bg-[#f0fdf4] dark:bg-emerald-950/20 rounded-[24px] p-5 border border-emerald-100/70 dark:border-emerald-900/30 flex items-start gap-3">
//             <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
//             <div>
//               <h4 className="text-[12px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Senior UX</h4>
//               <p className="text-[12px] text-emerald-600/90 dark:text-emerald-500 mt-1 leading-relaxed font-medium">
//                 Edit without losing the existing product story, while still adding fresh media.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-7 bg-white dark:bg-[#1e293b] rounded-[24px] border border-slate-100 dark:border-slate-800 p-6 shadow-2xs">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Product Name</label>
//               <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name"
//                 className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all" />
//             </div>

//             <div>
//               <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Short Description</label>
//               <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="Short Description"
//                 className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all" />
//             </div>

//             <div>
//               <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Description</label>
//               <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Description"
//                 className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all resize-none" />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Price</label>
//                 <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price"
//                   className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all" />
//               </div>

//               <div>
//                 <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Discount Price</label>
//                 <input type="number" name="discountPrice" value={formData.discountPrice} onChange={handleChange} placeholder="Discount Price"
//                   className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all" />
//               </div>

//               <div>
//                 <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Stock</label>
//                 <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock"
//                   className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all" />
//               </div>

//               <div>
//                 <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">SKU</label>
//                 <input type="text" name="sku" value={formData.sku} onChange={handleChange} placeholder="SKU"
//                   className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all" />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Category</label>
//                 <div className="relative">
//                   <select name="category" value={formData.category} onChange={handleChange}
//                     className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all appearance-none cursor-pointer">
//                     <option value="" className="dark:bg-[#151f32]">Select Category</option>
//                     <option value="electronics" className="dark:bg-[#151f32]">electronics</option>
//                     <option value="sports" className="dark:bg-[#151f32]">sports</option>
//                     <option value="fashion" className="dark:bg-[#151f32]">fashion</option>
//                   </select>
//                   <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400 dark:text-slate-500 text-[10px]">▼</div>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Subcategory</label>
//                 <input type="text" name="subcategory" value={formData.subcategory} onChange={handleChange} placeholder="Subcategory"
//                   className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all" />
//               </div>
//             </div>

//             <div>
//               <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400 mb-1.5">Brand</label>
//               <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand"
//                 className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all" />
//             </div>

//             <div className="border border-slate-100 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-[#1e293b] space-y-3">
//               <label className="block text-[12px] font-bold text-slate-500 dark:text-slate-400">Tags</label>
//               <div className="flex gap-2">
//                 <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
//                   placeholder="Type a tag and press +"
//                   className="w-full bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 rounded-xl px-4 py-3 text-[13px] font-medium text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-[#151f32] transition-all" />
//                 <button type="button" onClick={handleAddTag}
//                   className="bg-[#6366f1] hover:bg-indigo-700 text-white w-11 h-11 rounded-xl flex items-center justify-center transition-colors shrink-0 cursor-pointer">
//                   <Plus className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="flex flex-wrap gap-2 pt-1">
//                 {tags.map((tag, index) => (
//                   <span key={index}
//                     className="inline-flex items-center gap-1 bg-[#eef2ff] dark:bg-indigo-950/40 text-[#4f46e5] dark:text-indigo-300 text-[12px] font-semibold px-4 py-1.5 rounded-full border border-indigo-100/30 dark:border-indigo-900/30">
//                     <span>#{tag.replace("#", "")}</span>
//                     <button type="button" onClick={() => handleRemoveTag(index)}
//                       className="hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-full p-0.5 text-indigo-400 transition-colors">
//                       <X className="w-3 h-3" />
//                     </button>
//                   </span>
//                 ))}
//                 {tags.length === 0 && (
//                   <>
//                     <span className="bg-[#eef2ff]/60 dark:bg-indigo-950/20 text-[#6366f1]/80 dark:text-indigo-400/80 text-[11px] font-semibold px-4 py-1.5 rounded-full">#8 ram</span>
//                     <span className="bg-[#eef2ff]/60 dark:bg-indigo-950/20 text-[#6366f1]/80 dark:text-indigo-400/80 text-[11px] font-semibold px-4 py-1.5 rounded-full">#128 gb</span>
//                   </>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center gap-3 pt-1">
//               <label className="flex items-center gap-2 bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 px-4 py-2.5 rounded-xl cursor-pointer select-none text-[13px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
//                 <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange}
//                   className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 accent-indigo-600" />
//                 <span>Featured</span>
//               </label>

//               <label className="flex items-center gap-2 bg-[#f1f5f9]/60 dark:bg-[#151f32] border border-slate-100 dark:border-slate-800 px-4 py-2.5 rounded-xl cursor-pointer select-none text-[13px] font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
//                 <input type="checkbox" name="active" checked={formData.active} onChange={handleChange}
//                   className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 accent-indigo-600" />
//                 <span>Active</span>
//               </label>
//             </div>

//             <hr className="border-slate-100/80 dark:border-slate-800 my-2" />

//             <div className="flex items-center gap-3 pt-1">
//               <button type="button" onClick={() => navigate("/products")}
//                 className="bg-[#e2e8f0] dark:bg-slate-700 hover:bg-slate-300/80 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 text-[13px] font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer">
//                 Cancel
//               </button>
              
//               <button type="submit"
//                 className="bg-[#6366f1] hover:bg-indigo-700 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer">
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default EditProduct;