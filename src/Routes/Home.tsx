import { getLatestMovies, useMultipleFetchingMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "./utils";
import Slider from "../components/Slider";

function Home() {
  const [
    { data: nowPlayingData, isLoading: nowPlayingIsLoading },
    { data: topRatedData, isLoading: topRatedIsLoading },
    { data: upcomingData, isLoading: upcomingIsLoading },
  ] = useMultipleFetchingMovies();
  getLatestMovies().then(res => console.log(res))
  const isLoading =
    nowPlayingIsLoading || topRatedIsLoading || upcomingIsLoading;
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>
          <Main>
            <SliderBox>
              <RowTitle>Now Playing</RowTitle>
              <Slider data={nowPlayingData} />
            </SliderBox>
            <SliderBox>
              <RowTitle>Top Rated</RowTitle>
              <Slider data={topRatedData} />
            </SliderBox>
            <SliderBox>
              <RowTitle>Upcoming</RowTitle>
              <Slider data={upcomingData} />
            </SliderBox>
          </Main>
        </>
      )}
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 100px;
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Main = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 250px;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;
const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const RowTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
`;

const SliderBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 5;
`;
