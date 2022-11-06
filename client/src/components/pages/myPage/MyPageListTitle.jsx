import classes from "./MyPageListTitle.module.css";

const MyPageListTitle = ({ text }) => {
  return (
    <div>
      <h2 className={classes.title}>{text}</h2>
    </div>
  );
};

export default MyPageListTitle;
