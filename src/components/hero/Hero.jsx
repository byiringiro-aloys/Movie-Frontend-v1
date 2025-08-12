import React from 'react';
import './Hero.css';
import Carousel from "react-material-ui-carousel";
import {Paper} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlay} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

const Hero = ({ movies })=>{
    const navigate = useNavigate();
    
    const reviews = (movieId) => {
        navigate(`/Reviews/${movieId}`);
    }
    
    // Function to extract YouTube video ID from various URL formats
    const extractYouTubeId = (url) => {
        if (!url) return null;
        
        // Handle different YouTube URL formats
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        
        // Fallback: try to extract last 11 characters if it looks like a video ID
        if (url.length >= 11) {
            const last11 = url.substring(url.length - 11);
            if (/^[a-zA-Z0-9_-]{11}$/.test(last11)) {
                return last11;
            }
        }
        
        return null;
    };
    
    return (
        <div className="movie-carousel-container">
            <Carousel>
                {
                    movies.map((movie)=>{
                        const trailerId = extractYouTubeId(movie.trailerLink);
                        
                        return (
                            <Paper key={movie.imdbId}>
                                <div className="movie-card-container">
                                    <div className="movie-card" style={{"--img":`url(${movie.backdrops[0]})`}}>
                                        <div className="movie-detail">
                                            <div className="movie-poster">
                                                <img src={movie.poster} alt=""/>
                                            </div>
                                            <div className="movie-title">
                                                <h4>{movie.title}</h4>
                                            </div>
                                            {trailerId ? (
                                                <Link to={`/Trailer/${trailerId}`}>
                                                    <div className="play-btn-icon-container">
                                                        <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay}/>
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div className="play-btn-icon-container disabled" title="Trailer not available">
                                                    <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay}/>
                                                </div>
                                            )}
                                            <div className="movie-review-button-container">
                                                <Button variant="outline-info" onClick={() => reviews(movie.imdbId)}>Reviews</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Hero