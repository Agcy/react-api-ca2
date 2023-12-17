import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";
import placeholderImg from '../../../images/pexels-dziana-hasanbekava-5480827.jpg';
import FavoriteIcon from "@mui/icons-material/Favorite";
import {ActorsContext} from "../../../contexts/actorsContext";

export default function ActorCard({ actor, action }) {
    const { following, addToFollowing } = useContext(ActorsContext);



    if (following.find((id) => id === actor.id)) {
        actor.following = true;
    } else {
        actor.following = false
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    actor.following ? (
                        <Avatar sx={{ backgroundColor: 'red'}}>
                            {/* 演员的首字母或其他标识 */}
                            {actor && actor.name ? actor.name.charAt(0) : '?'}
                        </Avatar>
                    ) : (
                        <Avatar sx={{ backgroundColor: 'default'}}>
                            {/* 演员的首字母或其他标识 */}
                            {actor && actor.name ? actor.name.charAt(0) : '?'}
                        </Avatar>
                    )
                }
                title={
                    <Typography variant="p" component="p">
                        {actor && actor.name ? actor.name : 'Unknown Actor'}
                    </Typography>
                }
            />
            <CardMedia
                sx={{ height: 500 }}
                image={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : placeholderImg
                }
            />
            <CardContent>
                {/* 可以在这里添加额外的演员信息，如生日、国籍等 */}
            </CardContent>
            <CardActions disableSpacing>
                {action(actor)}
                <Link to={`/actors/${actor.id}`}>
                    <Button variant="outlined" size="medium" color="primary">
                        Detail
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
