import ReviewForm from "../reviewForm/ReviewForm.jsx";
import api from '../../api/axiosConfig.js';
import {useParams} from "react-router-dom";
import {Container,Row,Col,Alert,Spinner} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import './Reviews.css';

const Reviews = ({getMovieData,movie,reviews,refreshReviews})=> {

    const revText = useRef();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [localReviews, setLocalReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let params = useParams();
    const movieId = params.movieId;


    useEffect(() => {
        const fetchMovieData = async () => {
            setIsLoading(true);
            setError("");
            try {
                await getMovieData(movieId);
            } catch (err) {
                setError("Failed to load movie data. Please try again.");
                console.error("Error fetching movie data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (movieId) {
            fetchMovieData();
        }
    }, [movieId]);


    useEffect(() => {
        setLocalReviews(reviews || []);
    }, [reviews]);

    if (isLoading) {
        return (
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col xs="auto">
                        <Spinner className="justify-content-center" animation="grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-2 justify-content-center">Loading movie data...</p>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!movie) {
        return (
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col xs="auto">
                        <Alert variant="danger">
                            Failed to load movie data. Please try refreshing the page.
                        </Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    const addReview = async (e)=>{
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        const rev = revText.current;

        if (!rev.value.trim()) {
            setError("Please enter a review before submitting.");
            setIsSubmitting(false);
            return;
        }

        try {
            await api.post("/api/v1/reviews",{
                reviewBody: rev.value.trim(),
                imdbId: movieId
            });

            rev.value = "";

            setSuccess("Review submitted successfully!");
            setError("");

            if (refreshReviews) {
                await refreshReviews(movieId);
            } else {
                await getMovieData(movieId);
            }

            setTimeout(() => setSuccess(""), 3000);
            
        } catch (err) {
            console.error("Error adding review:", err);
            if (err.response) {
                console.error("Error response:", err.response.data);
                setError(`Failed to submit review: ${err.response.data?.message || err.response.statusText}`);
            } else {
                setError("Failed to submit review. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {error && (
                        <Alert variant="danger" onClose={() => setError("")} dismissible>
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert variant="success" onClose={() => setSuccess("")} dismissible>
                            {success}
                        </Alert>
                    )}
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm 
                                        handleSubmit={addReview} 
                                        revText={revText} 
                                        labelText="Write a Review?!"
                                        disabled={isSubmitting}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr/>
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        localReviews && localReviews.length > 0 ? (
                            localReviews.map((r, index) => (
                                <div key={r.id?.timestamp || r.id || index} className="review-item">
                                    <Row>
                                        <Col>
                                            <div className="review-content">
                                                <p className="review-text">{r.body}</p>
                                                {r.id?.date && (
                                                    <small className="review-timestamp">
                                                        {new Date(r.id.date).toLocaleDateString()}
                                                    </small>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr/>
                                        </Col>
                                    </Row>
                                </div>
                            ))
                        ) : (
                            <Row>
                                <Col>
                                    <p className="text-muted">No reviews yet. Be the first to write one!</p>
                                </Col>
                            </Row>
                        )
                    }
                </Col>
            </Row>
        </Container>
    )

}

export default Reviews