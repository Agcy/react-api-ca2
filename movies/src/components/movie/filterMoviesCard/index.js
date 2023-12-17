import React, {useState, useEffect}  from "react";
import { useQuery } from "react-query";
import Spinner from '../../spinner'
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../../images/pexels-dziana-hasanbekava-5480827.jpg';
import { getGenres } from "../../../api/tmdb-api";

const formControl =
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  const [blurAmount, setBlurAmount] = useState(0);
  const [sortMethod, setSortMethod] = useState(''); // 新状态变量

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newBlur = Math.min(scrollY / 100, 10); // 限制最大模糊值
      setBlurAmount(newBlur);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortChange = (e) => {
    setSortMethod(e.target.value);
    props.onUserInput("sort", e.target.value); // 更新排序方法
  };

  return (
    <Card
        sx={{
          maxWidth: 1800,
          position: 'relative' // 添加相对定位
        }}
        variant="outlined"
    >
      <CardMedia
          sx={{
            height: 160,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            filter: `blur(${blurAmount}px)` // 应用模糊
          }} // 设置绝对定位
          image={img}
          title="Filter"
      />
      <CardContent
          sx={{ position: 'relative', zIndex: 2 }} // 确保内容在图片之上
      >
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={{...formControl, maxWidth: 1800}}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
              labelId="sort-label"
              id="sort-select"
              value={sortMethod}
              onChange={handleSortChange}
          >
            <MenuItem value="rating_desc">Rating: High to Low</MenuItem>
            <MenuItem value="rating_asc">Rating: Low to High</MenuItem>
            <MenuItem value="release_date_desc">Release Date: Newest</MenuItem>
            <MenuItem value="release_date_asc">Release Date: Oldest</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      {/*<CardMedia*/}
      {/*  sx={{ height: 100 }}*/}
      {/*  image={img}*/}
      {/*  title="Filter"*/}
      {/*/>*/}
    </Card>
  );
}
