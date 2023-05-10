import { LazyLoadImage } from "react-lazy-load-image-component";
import "@/styles/components/cardAchievement.css";

export interface achievement {
  id: number;
  name: string;
  image: string;
  Game: game;
}

export interface game {
  id: number;
  name: string;
  image: string;
  description: string;
}

export default function CardAchievement({
  achievement,
}: {
  achievement: achievement;
}): JSX.Element {
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{achievement.name}</h3>
            <LazyLoadImage
              src={achievement.image}
              alt="achievement img"
              className="card-image"
              placeholderSrc={achievement.image}
            />
          </div>
          <div className="card-body">
            <p className="card-description">{achievement.Game.description}</p>
            <LazyLoadImage
              src={achievement.Game.image}
              alt="game img"
              className="card-game-image"
              placeholderSrc={achievement.Game.image}
            />
            <h4 className="card-subtitle">{achievement.Game.name}</h4>
          </div>
        </div>
      </div>
    </>
  );
}
