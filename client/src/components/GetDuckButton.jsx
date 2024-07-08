import { useState } from 'react';

function GetDuckButton() {
  const [duckImage, setDuckImage] = useState('');
  const [showDuck, setShowDuck] = useState(false);
  const [showCook, setShowCook] = useState(false);

  function getDuck() {
    setShowDuck(true);
    const randomNum = Math.floor(Math.random() * 32);
    if (randomNum === 0) {
      setDuckImage('/img/turkey_emoji.png');
    } else {
      setDuckImage('/img/duck_emoji.png');
    }
    setShowCook(true);
  }

  function cookDuck() {
    setDuckImage('img/cooked_duck.png');
  }

  function removeDuck() {
    setShowDuck(false);
    setShowCook(false);
  }

  return (
    <>
      <button onClick={(e) => getDuck()}>Get Duck</button>
      <div>{showDuck && <img src={duckImage} width="160" height="160" />}</div>
      <div>
        {showCook && <button onClick={(e) => cookDuck()}>Cook Duck</button>}
        {showDuck && <button onClick={(e) => removeDuck()}>Remove Duck</button>}
      </div>
    </>
  );
}

export default GetDuckButton;
