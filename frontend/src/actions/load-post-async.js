import { request } from "../utils";
import { setPostData } from "./set-post-data";

export const loadPostAsync = (postId) => (dispatch) =>
	request(`/posts/${postId}`).then((postData) => {
		if (postData.data) {
			dispatch(setPostData(postData.data));
		}

		return postData;
	});
