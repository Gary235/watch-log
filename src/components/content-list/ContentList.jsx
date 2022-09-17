import { Grid, Space } from "@mantine/core";
import ItemList from "../item-list/ItemList";


const ContentList = (props) => {
  const {list, contentType, full} = props;

  return (
    <div className="list-container">
      <Grid columns={full ? 2 : 4}>
        {list
          ? list.map((item, i) => (
            <Grid.Col lg={full ? 1 : 2} md={full ? 2 : 4} key={`${i}. ${item.title}`}>
              <ItemList item={item} contentType={contentType} /> <Space h="sm" />
            </Grid.Col>
          ))
          : null
        }
      </Grid>
    </div>
  )
}

export default ContentList