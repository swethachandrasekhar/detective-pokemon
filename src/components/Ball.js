import ball from "../assets/pokeball-transp.png";
//importing PokemonGo logo
const Ball = (props) => {
  return (
    <div className="loadingContainer">
      <h3>Loading...</h3>
      <img src={ball} alt="The PokemonGo logo" className={`pokemonBall loading ${props.displayClass}`} />
    </div>
  );
};

export default Ball;
