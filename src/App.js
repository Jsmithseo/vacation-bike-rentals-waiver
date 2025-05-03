import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Alert } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const todayDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  
  const waiverText = `VACATION BIKE RENTALS LLC BICYCLE RENTAL AGREEMENT
  
  This BICYCLE RENTAL AGREEMENT (“Agreement”) is effective as of ${todayDate} (the “Effective Date”), by and between PARTICIPANT and VACATION BIKE RENTALS LLC, a California corporation (“ VACATION BIKE RENTALS”).
  
  In consideration of PARTICIPANT’S rental and use of the bicycle(s) rented from VACATION BIKE RENTALS (the “Bicycle(s)”), PARTICIPANT hereby agrees to the terms of this Bicycle Rental Agreement (“Agreement”) for me and any minor on whose behalf I am acting (the “MINOR(s)”), as follows:
  
  PARTICIPANT is an adult 18 years of age or older and/or is a parent/legal guardian legally authorized to act and enter this Agreement on behalf of a minor under the age of 18. The use of “I”, “me”, “my”, “myself”, and “our” refers to me alone and/or me and the MINOR(s), collectively.
  
  PARTICIPANT attests that PARTICIPANT meets the criteria set forth in the attached Terms & Conditions (“T&Cs”), which are incorporated in this Agreement and made a part hereof, and can ride and operate the Bicycle(s) in a competent and safe manner, is qualified, in good health, and in proper physical and emotional condition to ride and operate the Bicycle(s). PARTICIPANT also attests that any MINOR on whose behalf PARTICIPANT is acting also meets the criteria set forth in the T&Cs, is qualified, in good health, in proper physical and emotional condition, properly trained, and mature enough to ride and operate the Bicycle(s). PARTICIPANT understands and agrees that VACATION BIKE RENTALS is not providing training or supervision for our use, riding, and operation of the Bicycle(s). PARTICIPANT has tested and inspected the Bicycle(s) and acknowledges that the Bicycle(s) are in good working condition.
  
  PARTICIPANT agrees to return the Bicycle(s), and all extras such as helmets and bags, to the original rental location, at the same time, complete as delivered and in good working order. Failure to do so will result in additional fees as set forth in the T&Cs. PARTICIPANT also agrees to notify Vacation Bike Rentals immediately of any malfunctions or breakages of the Bicycle(s). Operational and mechanical issues are addressed in the T&Cs.
  
  As further set forth in the T&Cs, PARTICIPANT is providing VACATION BIKE RENTALS LLC with credit card details and authorizes VACATION BIKE RENTALS LLC to charge PARTICIPANT for all costs in case of damages to the Bicycle(s) during the rental period, including labor charges. Additionally, loss or theft of the Bicycle(s) are addressed in the T&Cs.
  
  PARTICIPANT, for him/herself, and on behalf of MINOR(s), understands that all users of Bicycle(s) rented from VACATION BIKE RENTALS are bound by the rules of the road set forth by the State of California and local jurisdictions including but not limited to; not riding under the influence of alcohol or drugs, following traffic laws including stop signs, cellular phone use, traveling with the flow of traffic, etc. Any infractions resulting in a traffic accident or citation are the responsibility of the PARTICIPANT, including fines, fees for impoundment of Bicycle(s) and costs for retrieving bicycles from off-site locations.
  
  PARTICIPANT Release
  
  PARTICIPANT, for him/herself, and on behalf of MINOR(s), and their respective representatives, heirs, next of kin, spouses, executors, and assigns, assumes the risk of renting the Bicycle(s), an e-bike, and participating in the activity of bike riding, cycling, biking and e-bike riding, agrees that such activities may inherently be risky, acknowledges that such risks may include, but are not limited to, serious personal injury, illness, permanent disability, death, economic loss, property loss and damage, and does hereby release, discharge, hold harmless, and covenants not to sue VACATION BIKE RENTALS, its affiliates, officers, directors, agents, trustees, contractors, employees, shareholders and insurers (all collectively referred to herein as the "Releasees") from any and all claims, loss, causes of action, liability, damages, or expense related to PARTICIPANT’s and MINOR’s use of the Bicycle(s) including, but not limited to, participation in the activities of bike riding, cycling, biking and e-bike riding, and arising out of or related to: 1) any acts or omissions of Releasees or any other person; 2) failure or operational malfunction of the Bicycle(s) or other rented equipment provided by VACATION BIKE RENTALS; and 3) any other cause whatsoever, where such other cause results in or relates to injury or death to PARTICIPANT, MINOR(s), or others, damages of any kind, delay, loss, inconvenience or property damage.
  
  PARTICIPANT, for him/herself, and on behalf of MINOR(s), knowingly waives his/her/their rights under Section 1542 of the California Civil Code, or under any comparable law of any other jurisdiction, which states: A general release does not extend to claims that the releasing party does not know or suspect to exist in his or her favor at the time of executing the release and that, if known by him or her, would have materially affected his or her settlement with the released party.
  
  Indemnification
  
  PARTICIPANT, for him/herself, and on behalf of MINOR(s), shall indemnify, protect, defend and hold harmless VACATION BIKE RENTALS and any of its officers, directors, employees, members, managers, partners, agents, and representatives (each such party being a “VACATION BIKE RENTALS Indemnified Party”), who was or is a party or is threatened to be made a party to any threatened, pending or completed claim, allegation, action, suit or proceeding initiated by a third party (not PARTICIPANT or MINOR), whether civil, criminal, administrative or investigative, against losses, damages, claims or expenses actually and reasonably incurred by such VACATION BIKE RENTALS Indemnified Party (including reasonable attorneys’ fees, judgments, fines and amounts paid in settlement) (collectively “Claim(s)”) arising out of any loss, injury, death or damage to persons or property whatsoever at any time that is suffered or sustained by PARTICIPANT, MINOR(s) or by any other person or entity, in connection with or as a result of activities or events in which PARTICIPANT and MINOR(s) participated in connection with this Agreement and any related activities undertaken by PARTICIPANT and MINOR(s) in connection with this Agreement.
  
  PARTICIPANT attests that I have carefully read and fully understand this entire Agreement, am signing of my own free will, intending to be legally bound, and understand that by signing this Agreement I am giving up important legal rights for me and MINOR(s). My acknowledgement and our assumption of risk is freely and voluntarily given with the understanding that my and MINOR(s)’ rights to legal recourse against the Releasees Parties are knowingly given up in return for my/our ability to rent the Bicycle(s) and engage in the anticipated activities while using, riding and operating them.
  
  This Agreement, and the application of interpretation hereof shall be governed exclusively by its terms and by the laws of the State of California. Exclusive jurisdiction and venue for all matters hereunder shall be in Marin County, California and the parties agree to submit to such exclusive jurisdiction and venue.
  
  By signing below, I agree, for myself and on behalf of the MINOR for whom I act as Legal Guardian, to the terms of this Bike Rental Agreement and the Terms & Conditions of Rental.`;
  

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

    const hubspotPortalId = "48503737";
    const hubspotFormId = "d9992bc7-1a6e-4ea6-b1f6-95d5da114d30";
    const hubspotEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`;

    const formDataHubspot = {
      fields: [
        { name: "firstname", value: data.firstname },
        { name: "lastname", value: data.lastname },
        { name: "email", value: data.email },
        { name: "phone", value: data.phone },
        { name: "rentaldate", value: data.rentalDate },
        { name: "dob", value: data.dob || "" },
        { name: "height", value: data.height || "" },
        { name: "weight", value: data.weight || "" },
        { name: "helmetsize", value: data.helmetSize || "" },
        { name: "emergencycontact", value: data.emergencyContact || "" },
        { name: "emergencyphone", value: data.emergencyPhone || "" },
        { name: "medicalconditions", value: data.medicalConditions || "" },
        { name: "othernotes", value: data.otherNotes || "" }
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

        <div className="form-check mb-4">
          <input
            type="checkbox"
            {...register("waiverAgreement", { required: true })}
            className="form-check-input"
            id="waiverCheck"
            disabled={!scrolledToBottom}
          />
          <label className="form-check-label" htmlFor="waiverCheck">
            I agree to the official Vacation Bike Rentals LLC Bicycle Rental Agreement below.
          </label>
          <div>
            <a href="/waiver-info" target="_blank" rel="noopener noreferrer">
              Read full waiver in separate tab
            </a>
          </div>
        </div>

        <div
          className="mb-4"
          style={{
            maxHeight: "300px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "1rem",
          }}
          onScroll={(e) => {
            const el = e.target;
            if (el.scrollHeight - el.scrollTop === el.clientHeight) {
              setScrolledToBottom(true);
            }
          }}
        >
          <p style={{ whiteSpace: "pre-wrap" }}>{waiverText}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>Rental Date</div>
          <input type="date"  {...register("rentalDate", { required: true })} className="form-control mb-2" />
          <div>First Name</div>
          <input {...register("firstname", { required: true })} className="form-control mb-2" />
          <div>Last Name</div>
          <input {...register("lastname", { required: true })} className="form-control mb-2" />
          <div>Date of Birth</div>
          <input type="date" {...register("dob")} className="form-control mb-2" />
          <div>Email</div>
          <input type="email" {...register("email", { required: true })} className="form-control mb-2" />
          <div>Phone Number</div>
          <input {...register("phone", { required: true })} className="form-control mb-2" />
          <div>Height</div>
          <input {...register("height")} className="form-control mb-2" />
          <div>Weight</div>
          <input {...register("weight")} className="form-control mb-2" />
          <div className="mb-2">
            <label>Helmet Size</label>
            <select {...register("helmetsize")} className="form-control">
              <option value="">Select size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>
          <div>Emergency Contact Name</div>
          <input {...register("emergencycontact")} className="form-control mb-2" />
          <div>Emergency Contact Phone</div>
          <input {...register("emergencyphone")} className="form-control mb-2" />
          <div>Medical Conditions or Allergies</div>
          <textarea {...register("medicalconditions")} className="form-control mb-2" rows="2" />
          <div>Other Notes</div>
          <textarea {...register("otherNotes")} className="form-control mb-2" rows="2" />

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
