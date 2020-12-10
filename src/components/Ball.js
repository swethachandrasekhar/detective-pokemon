import ball from "../assets/pokeball-transp.png";
//importing PokemonGo logo
const Ball = (props) => {
  return (
    <>
      <img src={ball} alt="The PokemonGo logo" className={`pokemonBall ${props.displayClass}`} />
    </>
  );
};

export default Ball;
