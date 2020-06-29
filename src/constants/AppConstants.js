export const VALUES = {
    less_voted: "lessVoted",
    most_voted: "mostVoted"
}

export const BUTTONS = {
    add: "ADD",
    submit_a_link: "SUBMIT A LINK"
}

export const LABELS = {
    link_name: "Link Name",
    link_url: "Link Url",
    add_new_link: "Add New Link",
    return_to_list: "Return To List",
    header_title: "hepsiburada.com",
    link_vote_challenge: "LinkVote Challenge",
    points: "POINTS",
    up_vote: "Up Vote",
    down_vote: "Down Vote",
    most_voted: "Most Voted (Z -> A)",
    less_voted: "Less Voted (A -> Z)"
};

export const ALERTS = {
    item_is_saved: "Item is saved",
    delete_item: "Are you sure to delete this item?"
};

export const FIELDS = {
    points: "points",
    created_date: "createdDate",
    link_name: "linkName",
    url: "url"
}

export const PLACEHOLDERS = {
    link_name_placeholder: "e.g. Alphabet",
    url_placeholder: "e.g. http://abc.xyz"
}

export const VALIDATION_RULES = {
    link_name_rules: [
        {
            pattern: /^[A-Za-z]+$/,
            message: 'Only alphabetic characters'
        },
        {
            max: 50,
            message: 'Max 50 characters!',
        },
        {
            required: true,
            message: 'Link name can not be empty',
        },
    ],
    url_rules: [
        {
            type: 'url',
            message: 'Url is not valid!',
        },
        {
            required: true,
            message: 'Url can not be empty',
        },
    ]
}