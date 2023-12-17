import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CarouselComponent = ({images, interval = 3000}) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImgIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);
        return () => clearInterval(timer);
    }, [images.length, interval]);

    const handlePrev = () => {
        setCurrentImgIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentImgIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const getLeftImageIndex = () => {
        return (currentImgIndex - 1 + images.length) % images.length;
    };

    const getRightImageIndex = () => {
        return (currentImgIndex + 1) % images.length;
    };

    return (
        <Box sx={{position: 'relative', height: 500, overflow: 'hidden', margin: 'auto', maxWidth: '80%'}}>




            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                transition: 'transform 1s'
            }}>
                <Box component="img"
                     sx={{
                         position: 'absolute',
                         width: '30%',
                         left: '0%',
                         opacity: 0.5,
                         transition: 'opacity 1s, width 1s',
                         transform: 'scale(0.8)',
                         zIndex: 1 // 调整层级，确保中间图片位于最前方
                     }}
                     src={`https://image.tmdb.org/t/p/w500/${images[getLeftImageIndex()]}`}
                     alt="Left Image"
                />
                <IconButton
                    sx={{position: 'absolute', left: 10, top: '50%', zIndex: 2}}
                    onClick={handlePrev}
                >
                    <ArrowBackIosIcon/>
                </IconButton>
                <Box component="img"
                     sx={{
                         position: 'absolute',
                         width: '80%',
                         left: '12%',
                         opacity: 1,
                         transition: 'opacity 1s, width 1s',
                         transform: 'scale(1)',
                         zIndex: 2 // 最高层级
                     }}
                     src={`https://image.tmdb.org/t/p/w500/${images[currentImgIndex]}`}
                     alt="Current Image"
                />
                <IconButton
                    sx={{position: 'absolute', right: 10, top: '50%', zIndex: 2}}
                    onClick={handleNext}
                >
                    <ArrowForwardIosIcon/>
                </IconButton>
                <Box component="img"
                     sx={{
                         position: 'absolute',
                         width: '30%',
                         left: '80%',
                         opacity: 0.5,
                         transition: 'opacity 1s, width 1s',
                         transform: 'scale(0.8)',
                         zIndex: 1 // 同左侧图片保持一致的层级
                     }}
                     src={`https://image.tmdb.org/t/p/w500/${images[getRightImageIndex()]}`}
                     alt="Right Image"
                />
            </Box>
        </Box>
    );
};

export default CarouselComponent;
