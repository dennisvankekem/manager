import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import moment from 'moment';

import { IndexPage } from '~/support/layouts/IndexPage';
import { api } from '@/data';

describe('support/layouts/IndexPage', () => {
  const sandbox = sinon.sandbox.create();
  const dispatch = sandbox.spy();

  afterEach(() => {
    sandbox.restore();
  });

  it('renders a list of tickets', () => {
    const page = mount(
      <IndexPage
        dispatch={dispatch}
        tickets={api.tickets}
      />
    );

    const tickets = page.find('.TableRow');
    expect(tickets.length).to.equal(Object.keys(api.tickets.tickets).length);
    const ticket = tickets.at(0);

    // Get id without hashtag
    const id = ticket.find('td').at(1).text()
      .substring('#'.length);
    const renderedTicket = api.tickets.tickets[id];
    const label = ticket.find('Link').at(0);
    expect(label.props().to).to.equal(`/support/${id}`);
    expect(label.text()).to.equal(renderedTicket.summary);

    const formatTime = time => moment.utc(time).fromNow();

    expect(ticket.find(`#opened-by-${id}`).text()).to.equal(renderedTicket.opened_by);
    expect(ticket.find(`#opened-${id}`).text()).to.equal(formatTime(renderedTicket.opened));
    expect(ticket.find(`#regarding-${id}`).text()).to.equal(renderedTicket.entity.label);

    expect(ticket.find('td').at(2).text()).to.equal(
      `Updated by ${renderedTicket.updated_by} ${formatTime(renderedTicket.updated)}`);
  });
});
