import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../Components/NavBar";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../../Styles/StyleLands.css'



function DetailsLandPage() {
  const { available_land_id } = useParams();
  const [landImages, setLandImages] = useState([]);
  const [landDetails, setLandDetails] = useState([]);
  const [error, setError] = useState("");

  const API_Images = "https://res.cloudinary.com/durjqlivi";

  useEffect(() => {
    const fetchLandImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/propertyLands/getAllPropertyLandsByLandId/${available_land_id}/en`
        );
        const images = response.data.map((land) => ({
          ...land,
          image: `${API_Images}/${land.image}`,
        }));
        setLandImages(images || []);
      } catch (error) {
        console.error("Error fetching land images:", error);
        setError("Failed to fetch land images.");
      }
    };

    const fetchLandDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/propertyLands/getAllPropertyLandsByLandId/${available_land_id}/en`
        );
        setLandDetails(response.data || []);
      } catch (error) {
        console.error("Error fetching land details:", error);
        setError("Failed to fetch land details.");
      }
    };

    fetchLandImages();
    fetchLandDetails();
  }, [available_land_id]);

  return (
    <>
      <NavBar />
      <div className="details-page">
        <h4>Details Land Page</h4>
        {error && <p className="error">{error}</p>}

      
        <div className="land-images">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            style={{ width: "100%", height: "auto" }}
          >
            {landImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  style={{
                    width: "80%",
                    height: "700px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    margin: "0 auto",
                    display: "block",
                  }}
                  src={image.image}
                  alt={`Land ${index + 1}`}
                  className="land-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      
        <div className="land-details">
          <h5>Land Details</h5>
          <div className="details-grid">
            {landDetails.length > 0 ? (
              landDetails.map((land, index) => (
                <div className="detail-card" key={index}>
                  <h6>Land {index + 1}</h6>
                  <div>
                    <strong>Property:</strong> {land.property || "N/A"}
                  </div>
                  {land.CategoriesLand && (
                    <>
                      <div>
                        <strong>Title:</strong> {land.CategoriesLand.title || "N/A"}
                      </div>
                      <div>
                        <strong>Price:</strong> {land.CategoriesLand.price || "N/A"}
                      </div>
                      <div>
                        <strong>Location:</strong> {land.CategoriesLand.location || "N/A"}
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No details available for this land.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsLandPage;
