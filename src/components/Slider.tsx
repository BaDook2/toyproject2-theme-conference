import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { IGetMoviesResult, IGetTvResult } from "../api";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../Routes/utils";

const offset = 6;

type IMOVIESlider = {
  data: IGetMoviesResult | IGetTvResult | undefined;
};

function Slider({ data }: IMOVIESlider) {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const navigate = useNavigate();
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setNextSlide(false);
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      setNextSlide(true);
    }
  };
  const [leaving, setLeaving] = useState(false);
  const [$nextSlide, setNextSlide] = useState<boolean>(false);
  const pathName = useLocation().pathname.split("/")[2];
  const onBoxClicked = (id: number) => {
    const path = pathName ? `/nomadCoder-reactJS-Graduation/${pathName}/${id}` : `/nomadCoder-reactJS-Graduation/movies/${id}`;
    navigate(`${path}`);
  };

  const matchProgram = useMatch(`/nomadCoder-reactJS-Graduation/${useLocation().pathname.split("/")[2]}/:id`);
  function onOverlayClick() {
    const path = pathName === "movies" ? `/nomadCoder-reactJS-Graduation` : `/nomadCoder-reactJS-Graduation/${pathName}`;
    navigate(`${path}`);
  }
  const clickedBox =
    matchProgram?.params.id &&
    data?.results.find((program) => program.id + "" === matchProgram.params.id);

  return (
    <>
      <Movies>
        <SliderButton $nextSlide="left" onClick={decreaseIndex}>
          &lt;
        </SliderButton>
        <SliderButton $nextSlide="right" onClick={increaseIndex}>
          &gt;
        </SliderButton>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={$nextSlide}
        >
          <Row
            variants={rowVariants}
            custom={$nextSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((data) => (
                <Box
                  layoutId={data.id + ""}
                  key={data.id}
                  whileHover="hover"
                  initial="normal"
                  variants={boxVariants}
                  transition={{ type: "tween" }}
                  bgphoto={makeImagePath(data.backdrop_path, "w500")}
                  onClick={() => onBoxClicked(Number(data.id))}
                >
                  <Info variants={infoVariants}>
                    <h4>{data.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </Movies>
      <AnimatePresence>
        {matchProgram ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigDescription
              layoutId={matchProgram.params.id}
              style={{
                top: scrollY.get() + 50,
              }}
            >
              {clickedBox && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedBox.backdrop_path,
                        "w500"
                      )}`,
                    }}
                  />
                  <BigTitle>{clickedBox.title}</BigTitle>
                  <BigOverview>{clickedBox.overview}</BigOverview>
                </>
              )}
            </BigDescription>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Slider;

const Movies = styled.div`
  position: relative;
`;

const SliderButton = styled.button<{ $nextSlide: "left" | "right" }>`
  position: absolute;
  top: 4rem;
  width: 50px;
  height: 50px;
  z-index: 1;
  font-size: 28px;
  border: transparent;
  border-radius: 50%;
  left: ${(props) => (props.$nextSlide === "left" ? "10px" : "auto")};
  right: ${(props) => (props.$nextSlide === "right" ? "10px" : "auto")};
  cursor: pointer;
  background-color: transparent;
  transition: scale 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    scale: 1.3;
  }
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
`;

const rowVariants = {
  hidden: ($nextSlide: boolean) => ({
    x: $nextSlide ? -window.outerWidth : window.outerWidth,
  }),
  visible: {
    x: 0,
  },
  exit: ($nextSlide: boolean) => ({
    x: $nextSlide ? window.outerWidth : -window.outerWidth,
  }),
};

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  color: red;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  width: 100%;
  position: absolute;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1;
`;

const BigDescription = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 2;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 300px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 28px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  top: -80px;
`;
