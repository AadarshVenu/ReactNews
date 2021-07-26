import React, { useState, useCallback, useEffect } from 'react'
import NewsItems from './NewsItems';
import axios from 'axios';
import { countries, categories } from '../utils/helper';
import './Headlines.css';

function Headlines() {
    const [country, setCountry] = useState();
    const [category, setCategory] = useState();
    const [headlines, setHeadlines] = useState([]);
    const [input, setInput] = useState();

    const inputChangeHandler = (event) => {
        setInput(event.target.value)
    }

    const fetchHeadlines = useCallback(() => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=1faf1edcce5e4e9ca33135cd92a7db72 `)
            .then(function (response) {
                // console.log(response.data.articles);
                setHeadlines(response.data.articles);
            })
            .catch(function (error) {
                console.log(error);
            })
    })

    const submitHandler = (event) => {
        event.preventDefault();
        axios.get(`https://newsapi.org/v2/everything?q=${input}&apiKey=1faf1edcce5e4e9ca33135cd92a7db72 `)
            .then(function (response) {
                // console.log(response.data.articles);
                setHeadlines(response.data.articles);
            })
            .catch(function (error) {

                console.log(error);
            })
    }

    useEffect(() => {
        country && category && fetchHeadlines()
    }, [country, category, fetchHeadlines])


    const countryChangeHandler = (event) => {
        setCountry(event.target.value)
        // console.log(country)
    }
    const categoryChangeHandler = (event) => {
        setCategory(event.target.value)
        // console.log(category)
    }


    return (
        <>
            <div className="wrapper">
                <h2 className="heading">Search News</h2>
                <form>
                    <div className="country-category-wrapper">
                        <label className="country-wrapper">
                            Select the country :
                            <select value={country} onChange={countryChangeHandler} >
                                <option >--Country--</option>
                                {countries.map(item => (<option key={item.value} value={item.value}>{item.name}</option>))}
                            </select>
                        </label>
                        <label className="category-wrapper">
                            Select the Category :
                            <select value={category} onChange={categoryChangeHandler} >
                                <option >--Category--</option>
                                {categories.map(item => (<option value={item}>{item}</option>))}
                            </select>
                        </label>
                    </div>
                </form>

                <div className="search-wrapper">
                    <form onSubmit={submitHandler}>
                        <input placeholder="Search here..." type="text" value={input} onChange={inputChangeHandler} />
                        <button className='search-button' type="submit">Search News</button>
                    </form>
                </div>
            </div>
            <NewsItems headlines={headlines} />
        </>
    )
}

export default Headlines;
