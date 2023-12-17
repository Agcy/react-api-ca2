import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";

const formControl = {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterActorsCard({ onUserInput }) {
    const handleTextChange = (e) => {
        onUserInput("name", e.target.value);
    };

    const handleSortChange = (e) => {
        onUserInput("sort", e.target.value);
    };

    const handleGenderChange = (e) => {
        onUserInput("gender", e.target.value);
    };

    return (
        <Card
            sx={{
                maxWidth: 1800,
                position: 'relative'
            }}
            variant="outlined"
        >
            <CardContent sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the actors.
                </Typography>
                <TextField
                    sx={{...formControl, maxWidth: 1800}}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    onChange={handleTextChange}
                />
                <FormControl sx={formControl}>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        onChange={handleSortChange}
                    >
                        <MenuItem value="popularity_desc">Popularity Descending</MenuItem>
                        <MenuItem value="popularity_asc">Popularity Ascending</MenuItem>
                        <MenuItem value="name_asc">Name Ascending</MenuItem>
                        <MenuItem value="name_desc">Name Descending</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={formControl}>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender-select"
                        onChange={handleGenderChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="2">Male</MenuItem>
                        <MenuItem value="1">Female</MenuItem>
                        {/* 添加更多性别选项 */}
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
}
