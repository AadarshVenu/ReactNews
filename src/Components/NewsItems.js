import React from 'react';
import './NewsItem.css'
import Moment from 'react-moment';

function NewsItems(props) {
    return (
        <div className="news-wrapper">
            {props.headlines && props.headlines.map(item =>
                <div className="each-news-wrapper" key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <h5>Author:{item.source.name}</h5>

                    <img src={item.urlToImage} alt="image"></img>
                    <h5> <Moment format="YYYY/MM/DD">{item.publishedAt}</Moment></h5>
                </div>
            )}
        </div>
    )
}

export default NewsItems;

