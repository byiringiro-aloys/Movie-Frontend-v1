import React from 'react';
import  {Form,Button} from "react-bootstrap";


const ReviewForm = ({handleSubmit,revText,labelText,defaultValue,disabled})=>{
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.controlTextarea1">
                <Form.Label>{labelText}</Form.Label>
                <Form.Control 
                    ref={revText} 
                    as="textarea" 
                    rows={3} 
                    defaultValue={defaultValue}
                    disabled={disabled}
                />
            </Form.Group>
            <Button 
                variant="outline-info" 
                type="submit"
                disabled={disabled}
            >
                {disabled ? "Submitting..." : "Submit"}
            </Button>
        </Form>
    )
}

export default ReviewForm;