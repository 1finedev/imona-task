import { DotLottiePlayer } from '@dotlottie/react-player';

const Loading = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div>
        <DotLottiePlayer
          src="loading.lottie"
          autoplay
          loop
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </div>
  );
};

export default Loading;
