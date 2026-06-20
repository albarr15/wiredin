import { useParams } from "react-router";

export default function Place() {
  const params = useParams();

  return (
    <>
      <h1>Place Page {params.placeId}</h1>
    </>
  );
}
