//icons
import atom from "../images/atom.png";
import lol from "../images/lol.png";
import avocado from "../images/avocado.png";
import gossip from "../images/gossip.png";
import napoleon from "../images/napoleon.png";
import politics from "../images/politics.png";
import truestory from "../images/reading-book.png";


export const sticker = (arg) => {
    switch (arg) {
      case "Science":
        return atom;
      case "Lol":
        return lol;
      case "Nature":
        return avocado;
      case "Gossip":
        return gossip;
      case "History":
        return napoleon;
      case "Politics":
        return politics;
      case "TrueStory":
        return truestory;
      default:
        return "";
    }
  };