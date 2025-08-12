import React, { useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";
import { Container, Alert, Spinner, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import './Trailer.css';

const Trailer = () => {
    let params = useParams();
    const navigate = useNavigate();
    const key = params.ytTrailerId;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (isLoading) {
                setIsLoading(false);
                setHasError(true);
            }
        }, 10000);

        return () => clearTimeout(timer);
    }, [isLoading]);

    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    const handleIframeError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const isValidYouTubeId = (id) => {
        return id && /^[a-zA-Z0-9_-]{11}$/.test(id);
    };

    if (!key || !isValidYouTubeId(key)) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                <div className="text-center">
                    <Alert variant="warning">
                        {!key ? "No trailer ID provided." : "Invalid trailer ID format."} Please go back and select a movie.
                    </Alert>
                    <Button variant="outline-primary" onClick={handleGoBack} className="mt-3">
                        <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                        Go Back
                    </Button>
                </div>
            </Container>
        );
    }

    return (
        <div className="trailer-container">
            <div className="back-button-container">
                <Button variant="outline-light" onClick={handleGoBack} className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Back to Movies
                </Button>
            </div>

            {isLoading && (
                <div className="loading-overlay">
                    <Spinner animation="border" role="status" variant="primary">
                        <span className="visually-hidden">Loading trailer...</span>
                    </Spinner>
                    <p className="mt-2">Loading trailer...</p>
                </div>
            )}
            
            {hasError ? (
                <Container className="d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
                    <div className="text-center">
                        <Alert variant="danger">
                            Failed to load trailer. The video may be unavailable or restricted.
                        </Alert>
                        <div className="mt-3">
                            <Button variant="outline-secondary" onClick={handleGoBack}>
                                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                                Go Back
                            </Button>
                        </div>
                    </div>
                </Container>
            ) : (
                <div className="react-player-container">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${key}?autoplay=1&modestbranding=1&rel=0&showinfo=0&origin=${window.location.origin}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={handleIframeLoad}
                        onError={handleIframeError}
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default Trailer;