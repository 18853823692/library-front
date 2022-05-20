import Vue from 'vue'
import {
    Button,
    Row,
    Container,
    Header,
    Main,
    Card,
    Form,
    FormItem,
    Input,
    Message,
    MessageBox,
    Loading,
    Avatar,
    Divider,
    Link,
    Timeline,
    TimelineItem,
    Pagination,
    Upload,
    Backtop,
    Carousel,
    CarouselItem,
    Skeleton,
    SkeletonItem,
    Table,
    TableColumn,
    Autocomplete,
    Rate,
    Menu,
    MenuItem,
    Submenu,
    Select,
    Option,
    Dialog,
    Tag,
    CheckboxGroup,
    CheckboxButton,
    Checkbox,
    Breadcrumb,
    BreadcrumbItem,
    Popover,
    Drawer,
    Collapse,
    CollapseItem,
    Calendar,
    Descriptions,
    DescriptionsItem,
    Notification,
    Tooltip,
    DatePicker,
    Popconfirm,
    Radio,
    Dropdown,
    DropdownItem,
    DropdownMenu
} from 'element-ui'

Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Radio)
Vue.use(Popconfirm)
Vue.use(DatePicker)
Vue.use(Tooltip)
Vue.use(Loading)
Vue.use(DescriptionsItem)
Vue.use(Descriptions)
Vue.use(Calendar)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Drawer)
Vue.use(Popover)
Vue.use(BreadcrumbItem)
Vue.use(Breadcrumb)
Vue.use(CheckboxGroup)
Vue.use(CheckboxButton)
Vue.use(Checkbox)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Rate)
Vue.use(Autocomplete)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Skeleton)
Vue.use(SkeletonItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Backtop)
Vue.use(Upload)
Vue.use(Pagination)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Button)
Vue.use(Row)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Divider)
Vue.use(Link)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification