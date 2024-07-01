"use client";
import React, { useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Notification from '@/components/Notification/Notification';

const supabase = createClientComponentClient();

const NewAuthorsPage = () => {
  const [authorData, setAuthorData] = useState({
    name: '',
    github: '',
    medium: '',
    twitter: '',
    linkedin: '',
    articles: '',
  });
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthorData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse articles into an array of objects
    const articlesArray = authorData.articles.split(',').map(title => ({ title: title.trim() }));
    const links = {
      github: authorData.github,
      medium: authorData.medium,
      twitter: authorData.twitter,
      linkedin: authorData.linkedin,
    };
    const authorDataToSubmit = {
      name: authorData.name,
      links,
      articles: articlesArray,
    };

    try {
      const { data, error } = await supabase.from('authors').insert([authorDataToSubmit]);

      if (error) {
        throw error;
      }

      console.log('Author data inserted:', data);
      setNotificationMessage('Author added to the database');

      // Clear the form after successful submission
      setAuthorData({
        name: '',
        github: '',
        medium: '',
        twitter: '',
        linkedin: '',
        articles: '',
      });
    } catch (error) {
      console.error('Error inserting author data:', error.message);
      setNotificationMessage('Failed to add author to the database');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">New Author Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={authorData.name} 
            onChange={handleChange} 
            className="px-4 py-2 border rounded-md w-full" 
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="github" className="block text-lg font-medium mb-2">GitHub</label>
          <input 
            type="text" 
            id="github" 
            name="github" 
            value={authorData.github} 
            onChange={handleChange} 
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="medium" className="block text-lg font-medium mb-2">Medium</label>
          <input 
            type="text" 
            id="medium" 
            name="medium" 
            value={authorData.medium} 
            onChange={handleChange} 
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="twitter" className="block text-lg font-medium mb-2">Twitter</label>
          <input 
            type="text" 
            id="twitter" 
            name="twitter" 
            value={authorData.twitter} 
            onChange={handleChange} 
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="linkedin" className="block text-lg font-medium mb-2">LinkedIn</label>
          <input 
            type="text" 
            id="linkedin" 
            name="linkedin" 
            value={authorData.linkedin} 
            onChange={handleChange} 
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="articles" className="block text-lg font-medium mb-2">Articles</label>
          <textarea 
            id="articles" 
            name="articles" 
            value={authorData.articles} 
            onChange={handleChange} 
            className="px-4 py-2 border rounded-md w-full h-32" 
            required 
          />
          <p className="text-sm text-gray-500">Separate articles by commas (,)</p>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
      </form>
      {notificationMessage && <Notification message={notificationMessage} setMessage={setNotificationMessage} />}
    </div>
  );
};

export default NewAuthorsPage;
