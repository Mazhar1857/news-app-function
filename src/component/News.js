import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalArticles, setTotalArticles] = useState(0);

    

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4b30234543c6467c9d8f9d88d796aaa1&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(30);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalArticles(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${props.category} - NewsMonkey`;
        updateNews();
        // fetchMoreData();
    },[page]);




    const handleNextClick = async () => {
        // if (page >= Math.ceil((totalArticles / props.pageSize))) {

        // } else {
        //     setState({ loading: true });
        //     let newPage = page + 1;
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4b30234543c6467c9d8f9d88d796aaa1&page=${newPage}&pageSize=${props.pageSize}`;
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log('next');
        //     setState({
        //         page: newPage,
        //         articles: parsedData.articles,
        //         loading: false
        //     });
        // }

        /*-------------------------------------------------------------------------------------- */
        /*The setState function is asynchronous, meaning that the state doesn't get updated immediately after calling setState. Therefore, when you log page immediately after calling setState, you might not get the updated value. In your handleNextClick and handlePrevClick methods, you are logging the page immediately after calling setState, and that's why you see unexpected results in the console. */
        // console.log(page)
        // let newPage = (page + 1);
        // setState({ page: newPage });
        // updateNews();
        // console.log(page)


        /*below is the correct way to write */
        // setState((prevState) => {

        //     return { page: newPage };
        // }, () => {
        //     console.log(page); // Logging the updated state
        //     updateNews();
        // });
        let newPage = page + 1;
        setPage(newPage, () => {
            updateNews();
        });


    }

    const handlePrevClick = async () => {

        // if (page <= 1) {
        //     // Do nothing if the current page is less than or equal to 1
        // } else {
        //     setState({ loading: true });
        //     let newPage = page - 1;
        //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4b30234543c6467c9d8f9d88d796aaa1&page=${newPage}&pageSize=${props.pageSize}`;
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log('prev');
        //     setState({
        //         page: newPage,
        //         articles: parsedData.articles,
        //         loading: false
        //     });
        // }


        /*-------------------------------------------------------------------------------------- */
        /*The setState function is asynchronous, meaning that the state doesn't get updated immediately after calling setState. Therefore, when you log page immediately after calling setState, you might not get the updated value. In your handleNextClick and handlePrevClick methods, you are logging the page immediately after calling setState, and that's why you see unexpected results in the console. */
        // console.log(page)
        // let newPage = (page - 1);
        // setState({ page: newPage });
        // console.log(page)
        // updateNews();

        /*below is the correct way to write */
        // setState((prevState) => {
        //     let newPage = prevState.page - 1;
        //     return { page: newPage };
        // }, () => {
        //     console.log(page); // Logging the updated state
        //     updateNews();
        // });

        let newPage = page - 1;
        setPage(newPage, () => {
            updateNews();
        });

    }



    // const fetchMoreData = async () => {
    //     props.setProgress(10);
    //     setPage(page + 1);
    //     setLoading(true);
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4b30234543c6467c9d8f9d88d796aaa1&page=${page}&pageSize=${props.pageSize}`;

    //     props.setProgress(30);
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     console.log(parsedData);

    //     props.setProgress(70);
    //     setArticles(articles.concat(parsedData.articles));
    //     setTotalArticles(parsedData.totalResults);
    //     setLoading(false);

    //     props.setProgress(100);

    // }


    console.log('render');
    return (
        <>
            <h2 className='text-center' style={{ margin: '35px 0px',marginTop:'90px' }} >NewsMonkey - Top Headlines</h2>
            {loading && (<div className='text-center'><div className="spinner-border m-1" role="status">
                <span className="sr-only"></span>
            </div></div>)}

            {/* <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalArticles}
                loader={<div className='text-center'><div className="spinner-border m-1" role="status">
                    <span className="sr-only"></span>
                </div></div>}
            >
            </InfiniteScroll> */}

            <div className="container">
                <div className='row' >
                    {articles.map((element) => {
                        return <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} />
                        </div>
                    })}
                </div>
            </div>

            <div className="container d-flex justify-content-between">
                <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalArticles / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
            </div>
        </>
    )

}

News.propstypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

News.defaultProps = {
    country: 'in',
    pageSize: 20,
    category: 'health'
}

export default News


