import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../../../../components";
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from "../../../../../../actions";
import { selectUserRole } from "../../../../../../selectors";
import { ROLE } from "../../../../../../constants";

import styled from "styled-components";

const CommentContainer = ({ className, id, author, publishedAt, content }) => {
	const userRole = useSelector(selectUserRole);

	const dispatch = useDispatch();

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: "Удалить комментарий?",
				onConfirm: () => {
					dispatch(CLOSE_MODAL);
					dispatch(removeCommentAsync(id));
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			})
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							inactive={true}
							id="fa-user-circle-o"
							margin="0 10px 0 0"
							size="18px"
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							inactive={true}
							id="fa-calendar-o"
							margin="0 10px 0 0"
							size="18px"
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					margin="0 0 0 10px"
					size="21px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		border: 1px solid #000;
		width: 550px;
		padding: 5px 10px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
