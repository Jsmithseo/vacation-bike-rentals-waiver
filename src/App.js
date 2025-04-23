// Vacation Bike Waiver Form with Official Legal Waiver

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Alert } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const waiverText = `VACATION BIKE RENTALS LLC BICYCLE RENTAL AGREEMENT

This BICYCLE RENTAL AGREEMENT (“Agreement”) is effective as of ________________, 20__ (the “Effective Date”), by and between PARTICIPANT and VACATION BIKE RENTALS LLC, a California corporation (“ VACATION BIKE RENTALS”).

In consideration of PARTICIPANT’S rental and use of the bicycle(s) rented from VACATION BIKE RENTALS (the “Bicycle(s)”), PARTICIPANT hereby agrees to the terms of this Bicycle Rental Agreement (“Agreement”) for me  and any minor on whose behalf I am acting (the “MINOR(s)”), as follows:

... [Insert full waiver text here. For brevity, the remaining content is omitted but should be fully pasted in this section.] ...

By signing below, I agree, for myself and on behalf of the MINOR for whom I act as Legal Guardian, to the terms of this Bike Rental Agreement and the Terms & Conditions of Rental.`;

function VacationBikeWaiverForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const sigCanvas = useRef(null);
  const formRef = useRef(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const navigate = useNavigate();

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const onSubmit = async (data) => {
    if (sigCanvas.current.isEmpty()) {
      setError("Please provide your signature.");
      return;
    }

    setLoading(true);
    setError(null);

    const hubspotPortalId = "YOUR_REAL_PORTAL_ID";
    const hubspotFormId = "YOUR_REAL_FORM_ID";
    const hubspotEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;

    const formDataHubspot = {
      fields: [
        { name: "firstname", value: data.firstname },
        { name: "lastname", value: data.lastname },
        { name: "email", value: data.email },
        { name: "phone", value: data.phone },
        { name: "rental_date", value: data.rentalDate },
        { name: "dob", value: data.dob || "" },
        { name: "gender", value: data.gender || "" },
        { name: "height", value: data.height || "" },
        { name: "weight", value: data.weight || "" },
        { name: "helmet_size", value: data.helmetSize || "" },
        { name: "emergency_contact", value: data.emergencyContact || "" },
        { name: "emergency_phone", value: data.emergencyPhone || "" },
        { name: "medical_conditions", value: data.medicalConditions || "" },
        { name: "other_notes", value: data.otherNotes || "" }
      ],
    };

    try {
      await fetch(hubspotEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataHubspot),
      });

      setTimeout(async () => {
        const canvas = await html2canvas(formRef.current);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 190, 270);
        pdf.save("VacationBikeWaiver.pdf");

        setSuccess(true);
        navigate("/thank-you");
      }, 300);

    } catch (error) {
      console.error(error);
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light p-5">
      <div className="bg-white shadow-sm rounded p-5 w-100" ref={formRef}>
        <h1 className="text-center mb-4">Vacation Bike Rentals Waiver</h1>

        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">Form submitted successfully!</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input placeholder="First Name" {...register("firstname", { required: true })} className="form-control mb-2" />
          <input placeholder="Last Name" {...register("lastname", { required: true })} className="form-control mb-2" />
          <input placeholder="Email" type="email" {...register("email", { required: true })} className="form-control mb-2" />
          <input placeholder="Phone Number" {...register("phone", { required: true })} className="form-control mb-2" />
          <input type="date" {...register("rentalDate", { required: true })} className="form-control mb-2" />
          <input placeholder="Date of Birth" type="date" {...register("dob")} className="form-control mb-2" />
          <input placeholder="Gender (optional)" {...register("gender")} className="form-control mb-2" />
          <input placeholder="Height" {...register("height")} className="form-control mb-2" />
          <input placeholder="Weight" {...register("weight")} className="form-control mb-2" />
          <input placeholder="Helmet Size" {...register("helmetSize")} className="form-control mb-2" />
          <input placeholder="Emergency Contact Name" {...register("emergencyContact")} className="form-control mb-2" />
          <input placeholder="Emergency Contact Phone" {...register("emergencyPhone")} className="form-control mb-2" />
          <textarea placeholder="Medical Conditions or Allergies" {...register("medicalConditions")} className="form-control mb-2" rows="2" />
          <textarea placeholder="Other Notes" {...register("otherNotes")} className="form-control mb-2" rows="2" />

          <div className="form-check mb-4">
            <input type="checkbox" {...register("waiverAgreement", { required: true })} className="form-check-input" id="waiverCheck" disabled={!scrolledToBottom} />
            <label className="form-check-label" htmlFor="waiverCheck">
              I agree to the official Vacation Bike Rentals LLC Bicycle Rental Agreement below.
            </label>
            <div><a href="/waiver-info" target="_blank" rel="noopener noreferrer">Read full waiver in separate tab</a></div>
          </div>

          <div className="mb-4" style={{ maxHeight: "300px", overflowY: "scroll", border: "1px solid #ccc", padding: "1rem" }} onScroll={(e) => {
              const el = e.target;
              if (el.scrollHeight - el.scrollTop === el.clientHeight) {
                setScrolledToBottom(true);
              }
            }}>
            <p style={{ whiteSpace: 'pre-wrap' }}>{waiverText}</p>
          </div>

          <div className="mb-4">
            <p className="font-weight-bold mb-2">Signature:</p>
            <SignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{ width: 500, height: 200, className: "border rounded" }}
            />
            <button type="button" onClick={clearSignature} className="btn btn-link mt-2">
              Clear Signature
            </button>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-block"
            >
              {loading ? "Submitting..." : "Submit Waiver"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VacationBikeWaiverForm;
