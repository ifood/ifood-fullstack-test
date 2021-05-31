package com.ifood.demo.order.controller;

import com.ifood.demo.order.OrderApplication;
import com.ifood.demo.order.dto.OrderDetails;
import com.ifood.demo.order.dto.SearchParams;
import com.ifood.demo.order.service.OrderDetailsService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static com.ifood.demo.order.mock.ClientData.CLIENT1_EMAIL;
import static com.ifood.demo.order.mock.ClientData.CLIENT1_NAME;
import static com.ifood.demo.order.mock.ClientData.CLIENT1_PHONE;
import static com.ifood.demo.order.mock.ClientData.CLIENT2_EMAIL;
import static com.ifood.demo.order.mock.ClientData.CLIENT2_NAME;
import static com.ifood.demo.order.mock.ClientData.CLIENT2_PHONE;
import static com.ifood.demo.order.mock.OrderData.ITEM_DESCRIPTION;
import static com.ifood.demo.order.mock.OrderData.ITEM_PRICE;
import static com.ifood.demo.order.mock.OrderData.ITEM_QUANTITY;
import static com.ifood.demo.order.mock.OrderDetailsData.CREATED_DATE_STR;
import static com.ifood.demo.order.mock.OrderDetailsData.getOrderDetailsMock;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {OrderApplication.class})
public class OrderDetailsControllerTest {

    private static final Long EXPECTED_DATE = 1512151200000L;

    private MockMvc mvc;

    @InjectMocks
    private OrderDetailsController orderDetailsController;

    @Mock
    private OrderDetailsService orderDetailsService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mvc = MockMvcBuilders.standaloneSetup(orderDetailsController).build();
    }

    @Test
    public void getOrderDetails() throws Exception {

        List<OrderDetails> orderDetails = getOrderDetailsMock();
        when(orderDetailsService.getOrderDetails(any())).thenReturn(orderDetails);

        mvc.perform(get("/v1/orders/details")
                .accept(MediaType.APPLICATION_JSON)
                .param("startDate", CREATED_DATE_STR)
                .param("endDate", CREATED_DATE_STR))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name", is(CLIENT1_NAME)))
                .andExpect(jsonPath("$[0].email", is(CLIENT1_EMAIL)))
                .andExpect(jsonPath("$[0].phone", is(CLIENT1_PHONE)))
                .andExpect(jsonPath("$[0].createdAt", is(EXPECTED_DATE)))
                .andExpect(jsonPath("$[0].items", hasSize(3)))
                .andExpect(jsonPath("$[0].items[0].description", is(ITEM_DESCRIPTION)))
                .andExpect(jsonPath("$[0].items[0].quantity", is(ITEM_QUANTITY)))
                .andExpect(jsonPath("$[0].items[0].price", is(ITEM_PRICE)))
                .andExpect(jsonPath("$[0].items[1].description", is(ITEM_DESCRIPTION)))
                .andExpect(jsonPath("$[0].items[1].quantity", is(ITEM_QUANTITY)))
                .andExpect(jsonPath("$[0].items[1].price", is(ITEM_PRICE)))
                .andExpect(jsonPath("$[0].items[2].description", is(ITEM_DESCRIPTION)))
                .andExpect(jsonPath("$[0].items[2].quantity", is(ITEM_QUANTITY)))
                .andExpect(jsonPath("$[0].items[2].price", is(ITEM_PRICE)))

                .andExpect(jsonPath("$[1].name", is(CLIENT2_NAME)))
                .andExpect(jsonPath("$[1].email", is(CLIENT2_EMAIL)))
                .andExpect(jsonPath("$[1].phone", is(CLIENT2_PHONE)))
                .andExpect(jsonPath("$[1].createdAt", is(EXPECTED_DATE)))
                .andExpect(jsonPath("$[1].items", hasSize(3)))
                .andExpect(jsonPath("$[1].items[0].description", is(ITEM_DESCRIPTION)))
                .andExpect(jsonPath("$[1].items[0].quantity", is(ITEM_QUANTITY)))
                .andExpect(jsonPath("$[1].items[0].price", is(ITEM_PRICE)))
                .andExpect(jsonPath("$[1].items[1].description", is(ITEM_DESCRIPTION)))
                .andExpect(jsonPath("$[1].items[1].quantity", is(ITEM_QUANTITY)))
                .andExpect(jsonPath("$[1].items[1].price", is(ITEM_PRICE)))
                .andExpect(jsonPath("$[1].items[2].description", is(ITEM_DESCRIPTION)))
                .andExpect(jsonPath("$[1].items[2].quantity", is(ITEM_QUANTITY)))
                .andExpect(jsonPath("$[1].items[2].price", is(ITEM_PRICE)))
                .andReturn();
    }

    @Test
    public void getOrderDetails_NoStartDate() throws Exception {

        mvc.perform(get("/v1/orders/details")
                .accept(MediaType.APPLICATION_JSON)
                .param("endDate", CREATED_DATE_STR))
                .andExpect(status().isBadRequest())
                .andReturn();

        verify(orderDetailsService, times(0)).getOrderDetails(any(SearchParams.class));
    }

    @Test
    public void getOrderDetails_NoEndDate() throws Exception {

        mvc.perform(get("/v1/orders/details")
                .accept(MediaType.APPLICATION_JSON)
                .param("startDate", CREATED_DATE_STR))
                .andExpect(status().isBadRequest())
                .andReturn();

        verify(orderDetailsService, times(0)).getOrderDetails(any(SearchParams.class));
    }
}