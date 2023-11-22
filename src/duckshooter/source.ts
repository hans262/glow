import _gunlens from "./images/gun_lens.png";
import _blast from "./images/blast.png";
import _duck1 from "./images/duck_1.png";
import _duck2 from "./images/duck_2.png";
import _duck3 from "./images/duck_3.png";
import _duck4 from "./images/duck_4.png";

import ds_shot from "./sounds/ds_shot.ogg";
import ds_duck_hit from "./sounds/ds_duck_hit.ogg";

export type Source = Awaited<ReturnType<typeof loadSource>>;

export async function loadSource() {
  const [gunlens, blast, duck1, duck2, duck3, duck4, ad_shot, ad_duck_hit] =
    await Promise.all([
      loadImage(_gunlens),
      loadImage(_blast),
      loadImage(_duck1),
      loadImage(_duck2),
      loadImage(_duck3),
      loadImage(_duck4),
      loadAudio(ds_shot),
      loadAudio(ds_duck_hit),
    ]);
  return {
    gunlens,
    blast,
    duck1,
    duck2,
    duck3,
    duck4,
    ad_shot,
    ad_duck_hit,
  };
}

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (err) => {
      reject(err);
    };
  });
}

function loadAudio(url: string) {
  return new Promise<HTMLAudioElement>((resolve, reject) => {
    const audio = new Audio();
    audio.src = url;
    audio.oncanplay = () => {
      resolve(audio);
    };
    audio.onerror = (err) => {
      reject(err);
    };
  });
}
