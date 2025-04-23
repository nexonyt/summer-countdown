import { ProgressBar } from 'react-bootstrap';

const AnimatedExample = ({ now, label, animated,variant }) => {
  return (
    <ProgressBar style={{ position: 'relative', height: '35px'}} variant={variant} animated={animated} now={now} label={label} />
  );
};

export default AnimatedExample;
