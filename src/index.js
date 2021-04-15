import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyDtC0EwOMeY1At69xACmxMZzBwjwkVeMPI'; // api key received from youtube developer console

// create a new component and it should produce some HTML
class App extends Component {
    constructor(props){
        super(props);
        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch("blockchain");
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            }); // ES 6 will resolve this as 'this.setState({videos: videos})' since the property and it's value both has the same name
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} /> 
            </div> //encasing tags represents an INSTANCE of the element class in JSX
        );
    }
}

// take this component's generated HTML and put it on the page
// at the below location on the DOM
ReactDOM.render(<App/>, document.querySelector('.container'));