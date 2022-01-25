import React, {useState} from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import Button from

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const BreedShow = (props) => {
  const [expanded, setExpanded] = useState(false)
  const [count, setCount] = useState(0)
  // console.log(props.reportData)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  // console.log(props.image)
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.breed[0]}
          </Avatar>
        }
        title={props.breed}
      />
      <CardMedia
        component="img"
        height="194"
        src={props.image}
        alt={props.breed_group + " Group"}
      />
        <div>
          <button onClick={()=>setCount(count+1)}>{count}</button>
        </div>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
          
        <Typography variant="body2" color="text.secondary">
          {props.temperament}
        </Typography>
      </CardContent>
        <CardContent>
          <Typography paragraph>Statistics:</Typography>
          {props.reportData ? <Typography paragraph>There have been {props.reportData.length} reports of this breed.</Typography> : null}

          <Typography paragraph>Size:</Typography>
          <Typography paragraph>
            Height: {props.height} inches
          </Typography>
          <Typography paragraph>
            Weight: {props.weight} lbs
          </Typography>
          <Typography paragraph>
            Probably a wiki snippet
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default BreedShow