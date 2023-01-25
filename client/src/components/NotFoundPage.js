import './NotFoundPage.css';
import { useRouteError } from "react-router-dom";

export default function NotFoundPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="not-found-page">
      <h1>404</h1>
      <p id="not-found-subtitle">Does not compute...</p>
    </div>
  );
}
