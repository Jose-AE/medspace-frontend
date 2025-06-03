import Button from "@/components/Button";
import Modal from "@/components/Modal";
import StarRatingInput from "@/components/StarRatingInput";
import TextInput from "@/components/TextInput";
import { ReviewService } from "@/services/ReviewService";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  clinicId: number | null;
  landlordId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({
  clinicId,
  landlordId,
  isOpen,
  onClose
}: Props) {
  const [loading, setLoading] = React.useState(false);

  const [landlordRating, setLandlordRating] = React.useState(0);
  const [clinicRating, setClinicRating] = React.useState(0);

  const [clinicComment, setClinicComment] = React.useState("");
  const [landlordComment, setLandlordComment] = React.useState("");

  async function handleRate() {
    setLoading(true);

    try {
      await ReviewService.createReview(
        "clinic",
        clinicId!,
        clinicRating,
        clinicComment
      );
      await ReviewService.createReview(
        "landlord",
        landlordId!,
        landlordRating,
        landlordComment
      );

      setLandlordRating(0);
      setClinicRating(0);
      setClinicComment("");
      setLandlordComment("");

      onClose();
      toast.success("Review submitted successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("[ReviewModal]: Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!loading) onClose();
      }}
      body={
        <div className="flex flex-col  ">
          <h2 className="text-xl font-bold mb-4 ">Submit Review</h2>

          <div className="flex flex-col gap-2 ">
            <label htmlFor="star-rating">Landlord Rating</label>
            <StarRatingInput onChange={setLandlordRating} />
          </div>

          <div className="">
            <label htmlFor="feedback">Additional Comments</label>
            <TextInput
              value={landlordComment}
              onChange={(e) => setLandlordComment(e.target.value)}
              rows={4}
              className="resize-none"
              isTextArea
              placeholder="Leave your feedback here..."
            />
          </div>

          <div className="flex flex-col gap-2 mt-2 ">
            <label htmlFor="star-rating">Clinic Rating</label>
            <StarRatingInput onChange={setClinicRating} />
          </div>

          <div className="">
            <label htmlFor="feedback">Additional Comments</label>
            <TextInput
              value={clinicComment}
              onChange={(e) => setClinicComment(e.target.value)}
              rows={4}
              className="resize-none"
              isTextArea
              placeholder="Leave your feedback here..."
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={onClose} variant="outline" disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleRate} isLoading={loading}>
              Submit
            </Button>
          </div>
        </div>
      }
    />
  );
}
