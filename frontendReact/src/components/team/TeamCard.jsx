import { team } from "../../dummydata.js";



const TeamCard = () => {
  return (
    <>
      {team.map((val, index) => (
        <div className="items shadow" key={val.id || index}>
          <div className="img">
            <img src={val.cover} alt={val.name} />
            <div className="overlay">
              <i className="fab fa-facebook-f icon"></i>
              <i className="fab fa-twitter icon"></i>
              <i className="fab fa-instagram icon"></i>
              <i className="fab fa-tiktok icon"></i>
            </div>
          </div>
          <div className="details">
            <h2>{val.name}</h2>
            <p>{val.work}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TeamCard;
