// Function to get initials
const getInitials = (firstName, lastName) => {
  return firstName?.charAt(0) + lastName?.charAt(0);
};

export {
  getInitials
}