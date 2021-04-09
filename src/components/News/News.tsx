import React from 'react'
import CSS from 'csstype'
import { Box, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

const useStyles = makeStyles({
  cardGrid: {
    padding: '20px 0'
  },

  card: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  cardMedia: {
    paddingTop: '56.25%'
  },

  cardContent: {
    flexGrow: 1,
  },

  header: {
    color: 'white'
  },

  text: {
    color: 'white'
  }
});

export const News = (props: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <div>
      <Container className={classes.cardGrid}>
        <Grid container spacing={4}>
          <Grid item>
            <Card className={classes.card} style={{backgroundColor: "#2b2c2e"}}>
              <CardMedia 
                  className={classes.cardMedia}
                  image="https://i.ibb.co/CMrhRvx/Download.jpg"
                  title="Cosmetics"
              />
              <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" className={classes.header}>
                    Cosmetics
                  </Typography>
                  <Typography className={classes.text}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium quaerat recusandae quibusdam optio. Atque soluta harum dolor repudiandae eveniet placeat, fugit, eos ut exercitationem quibusdam, distinctio reiciendis nostrum quae? Consequuntur.
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
