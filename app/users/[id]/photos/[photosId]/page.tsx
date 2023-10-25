import React from "react";

interface Props {
  params: { id: number; photosId: number };
}

const PhotosPage = ({params: { id, photosId}}: Props) => {
  return <div>Photos {id} {photosId}</div>;
};

export default PhotosPage;
