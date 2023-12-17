import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { formatDate } from "../../../util"; // 假设有一个用于格式化日期的函数

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const ActorDetails = ({ actor }) => {
    return (
        <>
            <Typography variant="h5" component="h3">
                Biography
            </Typography>

            <Typography variant="h6" component="p">
                {actor.biography}
            </Typography>

            <Paper component="ul" sx={{ ...root }}>
                <Chip label={`Born: ${formatDate(actor.birthday)}`} sx={{ ...chip }} />
                {actor.place_of_birth && <Chip label={`Birthplace: ${actor.place_of_birth}`} sx={{ ...chip }} />}
                {/* 其他相关信息的展示 */}
            </Paper>

            {/* 根据需要添加更多展示信息 */}
        </>
    );
};

export default ActorDetails;
