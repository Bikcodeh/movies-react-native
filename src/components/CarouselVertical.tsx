import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Movie } from '../interfaces/movieinterfaces';

const WINDOW_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(WINDOW_WIDTH * 0.7);

interface Props {
    movies: Movie[]
}

export default function CarouselVertical(props: Props) {
    return (
        <Carousel
            layout='default'
            data={props.movies}
            sliderWidth={WINDOW_WIDTH}
            itemWidth={ITEM_WIDTH}
            renderItem={(item) => <RenderItem title='Movie' />}
        />
    )
}
interface RenderItemProps {
    title: string
}

const RenderItem = ({title}: RenderItemProps) => {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}