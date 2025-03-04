import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { AiFillEye, AiFillHeart, AiFillCloseCircle } from 'react-icons/ai'
import Device from '../../styles/Device'
import { ThemeContext } from '../../context/ThemeContext'
import { FavoriteContext } from '../../context/FavoriteContext'
import { AuthContext } from '../../context/AuthContext'
import Colors from '../../styles/Colors'

const Container = styled.div`
    max-width: 250px;
    margin-bottom: 40px;
    margin-left: 8px;
    margin-right: 8px;

    @media ${Device.mobileS} {
        max-width: 250px;
    }
    @media ${Device.tablet} {
        max-width: 320px;
    }
    @media ${Device.laptop} {
        min-width: 350px;
    }
    img {
        max-width: 250px;
        @media ${Device.mobileS} {
            max-width: 250px;
        }
        @media ${Device.tablet} {
            max-width: 320px;
        }
        @media ${Device.laptop} {
            min-width: 350px;
        }
    }
    svg {
        display: none;
    }
    &:hover svg {
        position: relative;
        top: -50px;
        left: 5px;
        display: block;
        background: ${Colors.DARK_CARD};
        border-radius: 5px;
        margin-right: 5px;
        padding: 2px;
    }
    &:hover img {
        box-shadow: ${`0 8px 8px ${Colors.LIGHT_CARD}`};
    }
`
const Tittle = styled.p`
    margin-top: 12px;
    margin-bottom: 6px;
    font-weight: bold;
    font-size: 1.075em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: ${({ themecontext }) => (themecontext ? Colors.DARK_LETTER : Colors.LIGHT_LETTER)};
`
const Text = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${Colors.GRAY};
    font-size: 0.95em;
`
const Icon = styled.div`
    font-size: 1.5rem;
    height: 56px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${Colors.WHITE};
    position: absolute;
`

function Card({ item, isFavorite }) {
    const [themeContext, themeDispatcher] = useContext(ThemeContext)
    const [favoriteContext, addFavorite, removeFavorite] = useContext(FavoriteContext)
    const [authContext, setAuth] = useContext(AuthContext)

    const capitalizeFirstLetterSentence = (mySentence) => {
        return mySentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
    }

    return (
        <Container role="gridcell">
            <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
            <Icon>
                <AiFillEye />
                {authContext?.id &&
                    (isFavorite ? (
                        <AiFillCloseCircle
                            onClick={(e) => {
                                removeFavorite(item)
                                e.preventDefault()
                            }}
                            data-testid="remove-favorite-card"
                        />
                    ) : (
                        <AiFillHeart
                            onClick={(e) => {
                                addFavorite(item)
                                e.preventDefault()
                            }}
                            data-testid="add-favorite-card"
                        />
                    ))}
            </Icon>
            <Tittle themecontext={themeContext} role="contentinfo">
                {item.snippet.title}
            </Tittle>
            <Text role="contentinfo">
                {capitalizeFirstLetterSentence(item.snippet.channelTitle)}
            </Text>
            <Text role="contentinfo">{item.snippet.description}</Text>
            <Text role="contentinfo">{item.snippet.publishedAt.substring(0, 10)}</Text>
        </Container>
    )
}

Card.propTypes = {
    item: PropTypes.shape({
        snippet: PropTypes.shape({
            title: PropTypes.string,
            channelTitle: PropTypes.string,
            description: PropTypes.string,
            publishedAt: PropTypes.string,
            thumbnails: PropTypes.shape({
                medium: PropTypes.shape({
                    url: PropTypes.string,
                }),
            }),
        }),
    }),
    isFavorite: PropTypes.bool,
}

Card.defaultProps = {
    item: PropTypes.shape({
        snippet: PropTypes.shape({
            title: null,
            channelTitle: null,
            description: null,
            publishedAt: null,
            thumbnails: null,
        }),
    }),
    isFavorite: true,
}

export default Card
