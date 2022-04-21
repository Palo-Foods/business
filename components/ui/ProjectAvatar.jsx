import React from 'react'

function ProjectAvatar() {
  return (
    <img
      src="/images/profile.jpg"
      width={45}
      height={45}
      className="rounded-circle img-fluid"
      style={{
        objectFit: "scale-down",
        border: "4px solid #0d6efd",
        marginRight: -10,
      }}
    />
  );
}

export default ProjectAvatar