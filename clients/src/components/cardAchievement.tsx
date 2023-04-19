import { LazyLoadImage } from "react-lazy-load-image-component";

interface achievement {
  id: number;
  name: string;
  image: string;
  imageId: string;
  GameId: string;
  game: game;
}

interface game {
  id: number;
  name: string;
  image: string;
  imageId: string;
  description: string;
}

export default function CardAchievement({
  achievement,
}: {
  achievement: achievement;
}): JSX.Element {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{achievement.name}</h3>
          <LazyLoadImage
            src={achievement.image}
            alt="achievement img"
            className="card-image"
          />
        </div>
        <div className="card-body">
          <p className="card-description">{achievement.game.description}</p>
          <LazyLoadImage
            src={achievement.game.image}
            alt="game img"
            className="card-game-image"
          />
          <h4 className="card-subtitle">{achievement.game.name}</h4>
        </div>
      </div>
    </>
  );
}
