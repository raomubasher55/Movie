import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryButtons = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  const predefinedCategories = [
    { label: 'New Movies', value: 'now_playing', languageCode: 'en' },
    { label: 'Bollywood', value: 'bollywood', languageCode: 'hi' },
    { label: 'hollywood', value: 'hollywood', languageCode: 'en' },
    { label: 'South Movie', value: 'south', languageCode: 'te' },
    { label: 'Hindi Movie', value: 'hindi', languageCode: 'hi' },
    { label: 'Punjabi', value: 'hindi', languageCode: 'pa' },
    { label: 'Pakistani', value: 'hindi', languageCode: 'pa' },
    { label: 'Action', value: 'action', languageCode: 'en' },
    { label: 'Crime', value: 'crime', languageCode: 'en' },
    { label: 'Thriller', value: 'thriller', languageCode: 'en' },
    { label: 'Horror', value: 'horror', languageCode: 'en' },
    { label: 'Romance', value: 'romance', languageCode: 'en' },
    { label: 'Drama', value: 'drama', languageCode: 'en' },
    { label: 'Comedy', value: 'comedy', languageCode: 'en' },
    { label: 'Fantasy', value: 'fantasy', languageCode: 'en' },
    { label: 'Sci-Fi', value: 'science_fiction', languageCode: 'en' },
    { label: 'Animation', value: 'animation', languageCode: 'en' },
    { label: 'Action Thriller', value: 'action_thriller', languageCode: 'en' },
    { label: 'TV Shows', value: 'tv_shows', languageCode: 'en' },
    { label: 'Documentary', value: 'documentary', languageCode: 'en' },
    { label: 'Family', value: 'family', languageCode: 'en' },
    { label: 'Adventure', value: 'adventure', languageCode: 'en' },
    { label: 'Music', value: 'music', languageCode: 'en' },
    { label: 'Western', value: 'western', languageCode: 'en' },
    { label: 'War', value: 'war', languageCode: 'en' },
    { label: 'Mystery', value: 'mystery', languageCode: 'en' },
    { label: 'Historical', value: 'history', languageCode: 'en' },
    { label: 'Biography', value: 'biography', languageCode: 'en' },
    { label: 'Sports', value: 'sports', languageCode: 'en' },
    { label: 'Short', value: 'short', languageCode: 'en' },
    { label: 'Musical', value: 'musical', languageCode: 'en' },
    { label: 'Cult', value: 'cult', languageCode: 'en' },
    { label: 'Indie', value: 'indie', languageCode: 'en' },
  ];
  

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/api/v1/categories`);
        const filteredCategories = response.data.map(({ _id, name }) => ({ _id, name }));
        
        // Save the filtered categories without the unnecessary fields
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Function to handle category selection
  const handleCategorySelection = (categoryName) => {
    // Find the matching category by label, case insensitive
    const matchedCategory = predefinedCategories.find(category => 
      category.label.toLowerCase() === categoryName.toLowerCase()
    );
    
    if (matchedCategory) {
      setSelectedCategory(matchedCategory.languageCode);
    }
  };

  return (
    <div className='container m-auto'>
      <div className="container flex flex-wrap justify-center my-4 space-x-2 mt-10">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`text-yellow-400 px-4 py-1 rounded-md m-1 border border-yellow-400 hover:bg-yellow-400 hover:text-black`}
            onClick={() => handleCategorySelection(category.name)} // Passing the category name to the handler
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className='text-white text-center rounded-md m-1 border border-gray-600 bg-gray-800 py-2 mt-10'>
        Please save the URL "<span className='text-yellow-400'>bollyflix.ind.in</span>" and Visit our website to get all movies and Web series Updates!
      </div>
    </div>
  );
};

export default CategoryButtons;
