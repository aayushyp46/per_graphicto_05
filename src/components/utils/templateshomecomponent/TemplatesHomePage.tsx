"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/utils/footer";
import apiService from "@/services/ApiService";
import Header from "@/components/utils/header";

interface Category {
  id: number;
  name: string;
}

interface Template {
  id: number;
  image_path: string;
  category_name: string;
}

const TemplateHomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleTemplates, setVisibleTemplates] = useState<Template[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Single loading state for both categories and templates
  const [error, setError] = useState<string | null>(null);
  const [allTemplates, setAllTemplates] = useState<Template[]>([]);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchCategoriesAndTemplates = async () => {
      try {
        // Fetch categories
        const categoryResponse = await apiService.getData("/api/categories/list?visible=1");
        if (categoryResponse.success) {
          const categoryNames = (categoryResponse.categories as Category[]).map(
            (cat) => cat.name
          );
          setCategories(categoryNames);
        } else {
          setError("Failed to fetch categories");
        }

        
        const templateResponse = await fetch("/api/templatesApi/list");
        const templateData = await templateResponse.json();
        if (Array.isArray(templateData)) {
          setAllTemplates(templateData);
          setVisibleTemplates(templateData); 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false); 
      }
    };

    fetchCategoriesAndTemplates();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    const filteredTemplates = allTemplates.filter(
      (template) => template.category_name.toLowerCase() === category.toLowerCase()
    );
    setVisibleTemplates(filteredTemplates);
    setCurrentPage(1);
    setImageIndex(0);
  };

  const handleAllClick = () => {
    setSelectedCategory("all");
    setVisibleTemplates(allTemplates);
    setCurrentPage(1);
    setImageIndex(0);
  };

  const handleNextClick = () => {
    const nextIndex = imageIndex + itemsPerPage;
    if (nextIndex >= visibleTemplates.length) return;
    setImageIndex(nextIndex);
    setCurrentPage(currentPage + 1);
  };

  const handlePrevClick = () => {
    const prevIndex = imageIndex - itemsPerPage;
    if (prevIndex < 0) return;
    setImageIndex(prevIndex);
    setCurrentPage(currentPage - 1);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(visibleTemplates.length / itemsPerPage);
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-between items-center mr-10 space-x-2 md:space-x-3 mt-20 mb-20">
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          className="px-2 py-2 bg-white text-blue-500 border-blue-500 border-2 rounded-3xl hover:text-white hover:bg-blue-500 hover:disabled:bg-white hover:disabled:text-blue-500 disabled:opacity-50"
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => {
                setCurrentPage(pageNumber);
                setImageIndex((pageNumber - 1) * itemsPerPage);
              }}
              className={`px-4 py-2 ${currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:text-white hover:bg-blue-500"
                } rounded-3xl`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className="px-2 py-2 bg-white text-blue-500 border-blue-500 border-2 rounded-3xl hover:text-white hover:bg-blue-500 hover:disabled:bg-white hover:disabled:text-blue-500 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  const renderTemplates = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTemplates = visibleTemplates.slice(startIndex, endIndex);

    return (
      <div className="grid grid-cols-1 mt-4 sm:grid-cols-1 md:grid-cols-3 gap-4">
        {currentTemplates.length > 0 ? (
          currentTemplates.map((template, index) => (
            <div key={template.id} className="cursor-pointer">
              <Image
                src={template.image_path}
                alt={`Preview after view Template ${index + 1}`}
                width={600}
                height={500}
                className="w-full h-auto rounded-xl shadow-lg object-cover"
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No templates available</p>
        )}
      </div>
    );
  };


  const Loader = () => (
    <div className="flex justify-center items-center h-64">
      <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="bg-gray-100 pb-8">
        <Header />
        <div className="text-center">
          <h1 className="text-3xl mt-10 font-sans text-gray-700">Templates</h1>
          <h2 className="text-xl font-sans text-gray-500 mt-2 mb-20">
            Hundreds of professionally designed infographic templates
          </h2>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-28 py-24 mt-10 mb-32">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <h1 className="text-3xl mb-4 text-gray-700 font-sans ml-2">Categories</h1>
            <div className="flex flex-col">
              {/* "All" button should be shown first */}
              <button
                onClick={handleAllClick}
                className={`px-4 font-sans text-xl py-2 m-2 mr-5 text-left rounded-sm hover:bg-blue-500 hover:text-white ${selectedCategory === "all"
                  ? "bg-blue-200 font-semibold text-blue-500"
                  : "text-gray-600"
                }`}
              >
                All
              </button>
             
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 font-sans text-xl py-2 m-2 mr-5 text-left rounded-sm hover:bg-blue-500 hover:text-white ${selectedCategory === category.toLowerCase()
                    ? "bg-blue-200 font-semibold text-blue-500"
                    : "text-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-3/4">
            {loading ? (
              <Loader />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              renderTemplates()
            )}

            <div className="mt-6 flex space-x-3 justify-center">{renderPagination()}</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TemplateHomePage;
